<?php
// Текущий рейтинг всех разработчиков: { ok, ratings: { devId: { sum, count } } }
require __DIR__ . '/tg_lib.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') reply(405, ['ok' => false, 'error' => 'Метод не поддерживается']);
header('Cache-Control: public, max-age=30');
reply(200, ['ok' => true, 'ratings' => (object)ratings_read(), 'storage' => true]);
