CREATE TABLE cliente 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(100) NOT NULL,  
 cpf CHAR(14) NOT NULL UNIQUE,  
 celular CHAR(14) NOT NULL,  
 email VARCHAR(100) NOT NULL UNIQUE,  
 senha VARCHAR(512) NOT NULL
); 
DROP TABLE cliente;

INSERT INTO cliente (
    nome, cpf, celular, email, senha
) VALUES (
    "Patrick Staroin", "111.222.333-66", 
    "(42)99999-4444", "patrick@gmail.com",
    "EAUHEAUISHEUIEAIS"
);

INSERT INTO cliente (nome, cpf, celular, email, senha) VALUES 
('Twilight Sparkle', '111.222.333-44', '(11)99888-1001', 'twilight.sparkle@ponyville.com', 'MAGICOFRIENDSHIP'),
('Rainbow Dash', '222.333.444-55', '(21)99777-2002', 'rainbow.dash@ponyville.com', 'SONICRAINBOOM'),
('Pinkie Pie', '333.444.555-66', '(31)99666-3003', 'pinkie.pie@ponyville.com', 'PARTYTIME'),
('Rarity', '444.555.666-77', '(41)99555-4004', 'rarity@ponyville.com', 'GEMHUNTER'),
('Applejack', '555.666.777-88', '(51)99444-5005', 'applejack@ponyville.com', 'APPLEBUCK'),
('Fluttershy', '666.777.888-99', '(61)99333-6006', 'fluttershy@ponyville.com', 'KINDCARE'),
('Apple Bloom', '777.888.999-00', '(71)99222-7007', 'apple.bloom@ponyville.com', 'CUTIEMARK'),
('Sweetie Belle', '888.999.000-11', '(81)99111-8008', 'sweetie.belle@ponyville.com', 'SWEETSONG'),
('Scootaloo', '999.000.111-22', '(91)99000-9009', 'scootaloo@ponyville.com', 'SCOOTERFLY'),
('Spike', '000.111.222-33', '(12)98999-1010', 'spike@ponyville.com', 'DRAGONHEART');

SELECT email, senha FROM cliente;

SELECT email, senha FROM cliente 
WHERE email = "rainbow.dash@ponyville.com";

SELECT * FROM cliente WHERE id <= 30 AND LENGTH(senha) > 20;

SELECT * FROM cliente;

DELETE FROM cliente WHERE id = 37;

UPDATE cliente 
SET nome = "Patrick Staroin", email = "p@gmail.com" 
WHERE id = 35;