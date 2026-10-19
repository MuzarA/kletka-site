<?php
// Общие функции для send.php, rate.php, ratings.php (обычный PHP-хостинг).
// Токен и chat id лучше задать переменными окружения хостинга.
// Если панель хостинга этого не умеет — впишите значения ниже.

define('BOT_TOKEN', getenv('TELEGRAM_BOT_TOKEN') ?: 'ВСТАВЬТЕ_ТОКЕН_БОТА');
define('CHAT_IDS',  getenv('TELEGRAM_CHAT_ID')   ?: 'ВСТАВЬТЕ_CHAT_ID');
define('TIMEZONE',  'Asia/Bishkek');
define('DATA_DIR',  __DIR__ . '/data');   // здесь хранится рейтинг; папка закрыта от браузера через .htaccess

header('Content-Type: application/json; charset=utf-8');

function reply($code, $data) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
function clean($v, $max) {
    $v = is_scalar($v) ? (string)$v : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v);
    return mb_substr(trim($v), 0, $max);
}
function h($s) { return htmlspecialchars($s, ENT_NOQUOTES, 'UTF-8'); }
function body() {
    $b = json_decode(file_get_contents('php://input'), true);
    return is_array($b) ? $b : $_POST;
}
function telegram_configured() {
    return strpos(BOT_TOKEN, 'ВСТАВЬТЕ') !== 0 && strpos(CHAT_IDS, 'ВСТАВЬТЕ') !== 0;
}
function now_str() {
    $dt = new DateTime('now', new DateTimeZone(TIMEZONE));
    return $dt->format('d.m.Y H:i');
}
function too_many($key, $max, $seconds) {
    $file = sys_get_temp_dir() . '/kletka_' . md5($key . ($_SERVER['REMOTE_ADDR'] ?? ''));
    $times = @json_decode(@file_get_contents($file), true) ?: [];
    $times = array_values(array_filter($times, function ($t) use ($seconds) { return time() - $t < $seconds; }));
    $times[] = time();
    @file_put_contents($file, json_encode($times));
    return count($times) > $max;
}
function send_telegram($text) {
    if (!telegram_configured()) return false;
    $ok = true;
    foreach (array_filter(array_map('trim', explode(',', CHAT_IDS))) as $chatId) {
        $ch = curl_init('https://api.telegram.org/bot' . BOT_TOKEN . '/sendMessage');
        curl_setopt_array($ch, [
            CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => json_encode(['chat_id' => $chatId, 'text' => $text, 'parse_mode' => 'HTML', 'disable_web_page_preview' => true], JSON_UNESCAPED_UNICODE),
        ]);
        $resp = json_decode((string)curl_exec($ch), true);
        curl_close($ch);
        if (empty($resp['ok'])) { $ok = false; error_log('Telegram error: ' . json_encode($resp)); }
    }
    return $ok;
}

// ---- хранилище рейтинга в JSON-файле с блокировкой ----
function ratings_update($fn) {
    if (!is_dir(DATA_DIR)) @mkdir(DATA_DIR, 0750, true);
    $fp = fopen(DATA_DIR . '/ratings.json', 'c+');
    if (!$fp) return null;
    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $db = json_decode($raw ?: '{}', true) ?: [];
    $db += ['devs' => [], 'rated' => []];
    $result = $fn($db);
    ftruncate($fp, 0); rewind($fp);
    fwrite($fp, json_encode($db, JSON_UNESCAPED_UNICODE));
    fflush($fp); flock($fp, LOCK_UN); fclose($fp);
    return $result;
}
function ratings_read() {
    $f = DATA_DIR . '/ratings.json';
    if (!is_file($f)) return [];
    $db = json_decode((string)file_get_contents($f), true) ?: [];
    return $db['devs'] ?? [];
}
