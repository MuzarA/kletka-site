<?php
// Заявка на консультацию → Telegram. В config.js: formEndpoint: "send.php"
require __DIR__ . '/tg_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'Метод не поддерживается']);
if (!telegram_configured()) reply(500, ['ok' => false, 'error' => 'Сервер не настроен: не заданы токен бота или chat id']);

$b = body();
if (!empty($b['website'])) reply(200, ['ok' => true]); // honeypot

$limits = ['name' => 80, 'channel' => 20, 'contact' => 120, 'type' => 60, 'budget' => 40, 'message' => 2000, 'page' => 300, 'lang' => 5];
$langNames = ['ru' => 'Русский', 'ky' => 'Кыргызча', 'en' => 'English'];
$d = [];
foreach ($limits as $k => $max) $d[$k] = clean($b[$k] ?? '', $max);

if (mb_strlen($d['name']) < 2 || mb_strlen($d['contact']) < 3 || mb_strlen($d['message']) < 10) {
    reply(400, ['ok' => false, 'error' => 'Заполните имя, контакт и описание игры']);
}
if (empty($b['agree'])) reply(400, ['ok' => false, 'error' => 'Нужно согласие на обработку данных']);
if (too_many('lead', 5, 600)) reply(429, ['ok' => false, 'error' => 'Слишком много заявок подряд, попробуйте через несколько минут']);

$contact = h($d['contact']);
if ($d['channel'] === 'Telegram' && preg_match('/^@?[A-Za-z0-9_]{4,32}$/', $d['contact'])) {
    $u = ltrim($d['contact'], '@');
    $contact = '<a href="https://t.me/' . $u . '">@' . $u . '</a>';
}
$text = implode("\n", [
    "🟥 <b>Новая заявка на консультацию</b>", "",
    "<b>Имя:</b> " . h($d['name']),
    "<b>" . h($d['channel'] ?: 'Контакт') . ":</b> " . $contact,
    "<b>Что нужно:</b> " . h($d['type'] ?: '—'),
    "<b>Бюджет:</b> " . h($d['budget'] ?: '—'),
    "<b>Язык сайта:</b> " . ($langNames[$d['lang']] ?? 'Русский'), "",
    "<b>Об игре:</b>", h($d['message']), "",
    "<i>" . now_str() . ($d['page'] ? ' · ' . h($d['page']) : '') . "</i>",
]);

if (!send_telegram($text)) reply(502, ['ok' => false, 'error' => 'Не удалось отправить заявку в Telegram']);
reply(200, ['ok' => true]);
