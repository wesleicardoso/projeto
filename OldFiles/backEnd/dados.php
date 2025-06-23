<?php
$server = 'http://t.meulogin.net';
$username = 'vagner1';
$password = 'vagner2';

header('Content-Type: application/json');

// Dados de autenticação (opcional incluir no retorno, cuidado com segurança)
$data = [
    'painel' => $server,
    'usuario' => $username,
    'senha' => $password
];

echo json_encode($data);

