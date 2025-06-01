
DROP DATABASE IF EXISTS dbprojeto2;
CREATE DATABASE dbprojeto2;
USE dbprojeto2;


CREATE TABLE usuarios (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(255) NOT NULL,
   senha VARCHAR(255) NOT NULL,
   cpf VARCHAR(14) UNIQUE,
   email VARCHAR(255) UNIQUE,
   criado_em DATETIME 
);


CREATE TABLE lista (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   nome_lista VARCHAR(200) NOT NULL,
   url VARCHAR(255) NOT NULL,
   usuario VARCHAR(200),
   senha VARCHAR(200),
   usuario_id INT,
   FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);



