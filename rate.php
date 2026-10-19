<?php
// Оценка разработчика → рейтинг в data/ratings.json + сообщение в Telegram.
// В config.js: rateEndpoint: "rate.php", ratingsEndpoint: "ratings.php"
require __DIR__ . '/tg_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'Метод не поддерживается']);

$b = body();
if (!empty($b['website'])) reply(200, ['ok' => true, 'stats' => null]); // honeypot

$devId   = clean($b['devId'] ?? '', 40);
$devName = clean($b['devName'] ?? '', 80) ?: $devId;
$stars   = filter_var($b['stars'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 5]]);
$name    = clean($b['name'] ?? '', 60);
$project = clean($b['project'] ?? '', 80);
$comment = clean($b['comment'] ?? '', 1000);
$page    = clean($b['page'] ?? '', 300);
$langName = ['ru' => 'Русский', 'ky' => 'Кыргызча', 'en' => 'English'][clean($b['lang'] ?? '', 5)] ?? 'Русский';

if (!preg_match('/^[a-z0-9_-]{1,40}$/', $devId)) reply(400, ['ok' => false, 'error' => 'Неизвестный разработчик']);
if ($stars === false || $stars === null) reply(400, ['ok' => false, 'error' => 'Оценка должна быть от 1 до 5']);
if (too_many('rate', 10, 600)) reply(429, ['ok' => false, 'error' => 'Слишком много оценок подряд, попробуйте позже']);

$who = substr(hash('sha256', 'kletka' . ($_SERVER['REMOTE_ADDR'] ?? '') . $devId), 0, 24);
$res = ratings_update(function (&$db) use ($devId, $stars, $who, $name, $project, $comment) {
    $limit = 180 * 24 * 3600; // одна оценка разработчику с одного IP раз в 180 дней
    if (isset($db['rated'][$who]) && time() - $db['rated'][$who] < $limit) return ['dup' => true];
    $db['rated'][$who] = time();
    $s = $db['devs'][$devId] ?? ['sum' => 0, 'count' => 0];
    $s['sum'] += $stars; $s['count'] += 1;
    $db['devs'][$devId] = $s;
    $db['reviews'][$devId][] = ['stars' => $stars, 'name' => $name, 'project' => $project, 'comment' => $comment, 'at' => date('c')];
    if (count($db['reviews'][$devId]) > 500) array_shift($db['reviews'][$devId]);
    return ['stats' => $s];
});
if ($res === null) reply(500, ['ok' => false, 'error' => 'Не удалось сохранить оценку: нет доступа к папке data']);
if (!empty($res['dup'])) reply(409, ['ok' => false, 'error' => 'Вы уже оценивали этого разработчика']);

$stats = $res['stats'];
$lines = [
    "⭐ <b>Новая оценка разработчику</b>", "",
    "<b>Разработчик:</b> " . h($devName),
    "<b>Оценка:</b> " . str_repeat('★', $stars) . str_repeat('☆', 5 - $stars) . " {$stars}/5",
    "<b>Рейтинг теперь:</b> " . number_format($stats['sum'] / $stats['count'], 2) . " · {$stats['count']} оц. с сайта",
];
if ($name) $lines[] = "<b>От:</b> " . h($name);
$lines[] = "<b>Язык сайта:</b> " . $langName;
if ($project) $lines[] = "<b>Проект:</b> " . h($project);
if ($comment) { $lines[] = ""; $lines[] = "<b>Отзыв:</b>"; $lines[] = h($comment); }
$lines[] = ""; $lines[] = "<i>" . now_str() . ($page ? ' · ' . h($page) : '') . "</i>";
send_telegram(implode("\n", $lines));

reply(200, ['ok' => true, 'stats' => $stats]);
