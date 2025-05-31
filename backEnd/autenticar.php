<?php
require_once './conect.php';


$nome = $_POST['name'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$cpf = $_POST['cpf'];


$sql = "INSERT INTO usuarios (nome, email, senha, cpf, criado_em) VALUES ('$nome', '$email', '$senha', '$cpf', NOW)";


if (mysqli_query($conn, $sql)) {
    header('location: ../index.html');
} else {
    echo "Erro: " . mysqli_error($conn);
}


?>
