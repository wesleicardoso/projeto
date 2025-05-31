<?php
require_once './conect.php';
session_start();

// Verifica se dados foram enviados
if (!isset($_POST['email']) || !isset($_POST['senha'])) {
    echo "Campos obrigatórios não foram enviados!";
    exit;
}

$email = $_POST['email'];
$senha = $_POST['senha'];

// Evita SQL Injection usando prepared statements
$stmt = $conn->prepare("SELECT id, senha FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Verifica a senha
    if (password_verify($senha, $row['senha'])) {
        $_SESSION['id'] = $row['id'];
        $_SESSION['email'] = $email;

        // Redireciona para painel protegido
        header('Location: ../index.html');
        exit;
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}

$stmt->close();
$conn->close();
?>
