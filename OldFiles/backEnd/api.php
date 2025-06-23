<?php
$server = 'http://t.meulogin.net';
$username = 'vagner1';
$password = 'vagner2';

header('Content-Type: application/json');

$action = $_GET['action'] ?? null;
$categoryId = $_GET['category_id'] ?? null;
$seriesId = $_GET['series_id'] ?? null;

$params = http_build_query([
    'username' => $username,
    'password' => $password,
    'action'   => $action
]);

if ($categoryId) {
    $params .= '&category_id=' . urlencode($categoryId);
}

if ($action === 'get_series_info' && $seriesId) {
    $url = "$server/player_api.php?username=$username&password=$password&action=get_series_info&series_id=$seriesId";
    $response = file_get_contents($url);
    echo $response;
    exit;
}

$url = "$server/player_api.php?$params";

// Pega resposta da API externa
$response = file_get_contents($url);

// Tenta decodificar a resposta
$responseData = json_decode($response, true);


echo json_encode($responseData);
