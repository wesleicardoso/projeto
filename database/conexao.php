<?php

namespace Conexao;
use PDO;
use PDOException;

class Conexao {
    private $host = 'localhost';
    private $db   = 'projetodb2';
    private $user = 'root';
    private $pass = '';
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host={$this->host};dbname={$this->db};charset=utf8",
                $this->user,
                $this->pass
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Erro na conexão: ' . $e->getMessage());
        }
    }

    public function getPdo() {
        return $this->pdo;
    }
}