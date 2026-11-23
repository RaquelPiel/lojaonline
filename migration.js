const db = require("./db")

// DROP na ordem inversa das FKs: itens -> compra -> imagem -> produto -> cliente
const ESTRUTURA_CLIENTE = `
    DROP TABLE IF EXISTS item_compra;
    DROP TABLE IF EXISTS compra;
    DROP TABLE IF EXISTS produto;
    DROP TABLE IF EXISTS cliente;

    CREATE TABLE cliente (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        cpf char(14) NOT NULL,
        celular char(14) NOT NULL,
        email varchar(100) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

const DADOS_CLIENTE = `
    INSERT INTO cliente VALUES 
        (12,'Nicolas Galvão','123.456.789-00','(42)99966-4444','galvao@gmail.com','$2b$10$N8b2YuzXWdMJVAAd670qG.ScLlmdFsuTJ7C6/GWtMKWhj8O0pU6Pu'),(13,'Nicolas Galvão','123.456.789-02','(42)99966-4444','galvao2@gmail.com','$2b$10$rNwWgUx8kezhoZXXuVG7NeBXqPFAzpkc37Sg4P.ETVtiSaWWqBHxy'),
        (14,'Patrick','123.123.123-12','(42)999669966','patrick123@gmail.com','$2b$10$MZMnDj10f7JnV6ArP.5hm.TAHDZ5NwECYSw6i5kbNowwhPuqbC/W.'),(19,'Richard','148.211.069-57','(42) 99931-865','bellusci.richard@escola.pr.gov.br','$2b$10$v3aTKV7iVqrcBJozlOZwie8I7yO2CyQIfuVk4uxR2RSDPELZSeyxS'),
        (28,'Patrick','111.222.333-49','(42)99999-4444','patrick67@gmail.com','$2b$10$QRU70xwZs0JYccsQcf/BFe7IIGYaqlS0xb.TIkGsv7UKviM2A26pq'),(29,'Kauã silva de lima','152.915.999-79','(42)99999-4444','kaua.lima11@escola.pr.gov.br','$2b$10$Ax80a.N/1RUsBU48IO1hX.d4hyiNt/15aV8.8VJuPziVuzTwGe8ly'),
        (30,'Bruno','120.897.429-76','(42)99830-3607','derbli@gmail.com','$2b$10$t8fYQCnQRXxvbLczF6YJNu31UvNT1qWhZ1r9GiftnFLy1rABdFKfG'),(31,'Guilherme','111.333.444-78','(42)55555-9999','poisler456@gmail.com','$2b$10$r9QmvPFklIeeoCoHfISzGeJNnjScdYm4JZiNBmffsblVzk48uyHXa'),
        (32,'Rhuan','137.604.709-80','(42)99999-4444','rhuan@gmail.com','$2b$10$QA3mNPH90POZijUIri.hKO5pQQH223KGKyYOYycQA0GtPuKGhPrkS');
`

const ESTRUTURA_PRODUTO = `
    CREATE TABLE produto (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(200) NOT NULL,
        descricao text NOT NULL,
        categoria varchar(50) NOT NULL,
        preco decimal(10,2) NOT NULL,
        caminho_img varchar(50) NOT NULL,
        quantidade_img int(11) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

const DADOS_PRODUTO = `
    INSERT INTO produto VALUES 
        (1,'Máquina de Tatuagem Rotativa','Máquina rotativa silenciosa com motor coreless, ideal para linhas e sombreamento.','Máquinas',899.90,'assets/img/maquina-rotativa.jpg',12),(2,'Máquina de Tatuagem Bobina','Máquina de bobina tradicional em ferro fundido, potência ajustável para traços firmes.','Máquinas',749.90,'assets/img/maquina-bobina.jpg',6),(3,'Máquina de Tatuagem Pen','Máquina tipo caneta, leve e portátil, ideal para iniciantes e detalhes finos.','Máquinas',599.90,'assets/img/maquina-pen.jpg',8),(4,'Fonte de Alimentação Digital','Fonte digital para máquina de tatuagem com display LCD e controle de voltagem.','Máquinas',349.90,'assets/img/fonte-tatuagem.jpg',10),(5,'Pedal de Acionamento','Pedal de acionamento para máquina de tatuagem, liga/desliga com o pé.','Máquinas',129.90,'assets/img/pedal-acionamento.jpg',15),
        (6,'Kit Agulhas Cartucho 20un','Kit com 20 agulhas cartucho descartáveis, diversos tamanhos, estéreis.','Agulhas e Cartuchos',89.90,'assets/img/kit-agulhas.jpg',25),(7,'Cartucho Linha 0.25mm','Cartucho para linha fina 0.25mm, pack com 10 unidades, estéril.','Agulhas e Cartuchos',49.90,'assets/img/cartucho-linha.jpg',30),(8,'Cartucho Sombreamento 0.35mm','Cartucho para sombreamento 0.35mm, pack com 10 unidades, estéril.','Agulhas e Cartuchos',49.90,'assets/img/cartucho-sombra.jpg',30),(9,'Agulha Magnum 0.40mm','Agulha magnum 0.40mm para preenchimento e sombreamento, pack com 10.','Agulhas e Cartuchos',59.90,'assets/img/agulha-magnum.jpg',22),
        (10,'Tinta Preta 30ml','Tinta preta profissional para tatuagem, 30ml, pigmentação intensa e duradoura.','Tintas',79.90,'assets/img/tinta-preta.jpg',20),(11,'Kit Tintas Coloridas 10un','Kit com 10 frascos de tintas coloridas para tatuagem, 15ml cada.','Tintas',249.90,'assets/img/tintas-coloridas.jpg',12),(12,'Tinta Vermelha 15ml','Tinta vermelha vibrante para tatuagem, 15ml, alta fixação.','Tintas',49.90,'assets/img/tinta-vermelha.jpg',18),(13,'Tinta Azul 15ml','Tinta azul intensa para tatuagem, 15ml, pigmentação estável.','Tintas',49.90,'assets/img/tinta-azul.jpg',18),(14,'Tinta Branca 15ml','Tinta branca para highlights e detalhes, 15ml.','Tintas',49.90,'assets/img/tinta-branca.jpg',18),
        (15,'Papel Transfer Stencil','Papel transfer para stencil, 100 folhas A4, alta definição.','Materiais de Transfer',59.90,'assets/img/papel-stencil.jpg',20),(16,'Creme de Transfer','Creme transfer para stencil, aplicação fácil e fixação uniforme.','Materiais de Transfer',29.90,'assets/img/creme-transfer.jpg',25),(17,'Desodorante Antitranspirante','Desodorante antitranspirante para antes da tatuagem, 60ml.','Materiais de Transfer',24.90,'assets/img/desodorante-tattoo.jpg',30),
        (18,'Filme PVC Protetor 30cm','Filme PVC protetor para tatuagem, rolo de 30cm x 30m, descartável.','Higiene e Proteção',39.90,'assets/img/filme-pvc.jpg',28),(19,'Luvas de Nitrilo Caixa','Caixa com 100 luvas de nitrilo descartáveis, sem pó.','Higiene e Proteção',49.90,'assets/img/luvas-nitrilo.jpg',35),(20,'Máscara Descartável Caixa','Caixa com 50 máscaras descartáveis, tripla camada.','Higiene e Proteção',29.90,'assets/img/mascara-descartavel.jpg',40),(21,'Papel Toalha Industrial','Rolo de papel toalha industrial, alta absorção, pack com 2.','Higiene e Proteção',19.90,'assets/img/papel-toalha.jpg',45),(22,'Sabonete Antisséptico','Sabonete antisséptico líquido para higienização de mãos e materiais.','Higiene e Proteção',24.90,'assets/img/sabonete-antisseptico.jpg',30),
        (23,'Copo Descartável 200ml','Pacote com 100 copos descartáveis 200ml, para água e tintas.','Higiene e Proteção',14.90,'assets/img/copo-descartavel.jpg',50),(24,'Almotolia Plástica 250ml','Almotolia para tintas e líquidos, 250ml, com bico dosador.','Higiene e Proteção',19.90,'assets/img/almotolia.jpg',22),
        (25,'Máquina de Tatuagem para Sobrancelha','Máquina delicada para micropigmentação de sobrancelhas, baixa vibração.','Micropigmentação',699.90,'assets/img/maquina-sobrancelha.jpg',8),(26,'Pigmento para Sobrancelha','Pigmento específico para micropigmentação de sobrancelhas, 15ml.','Micropigmentação',89.90,'assets/img/pigmento-sobrancelha.jpg',15),(27,'Kit Micropigmentação','Kit completo de micropigmentação com máquina, pigmentos e acessórios.','Micropigmentação',1299.90,'assets/img/kit-micropigmentacao.jpg',5),
        (28,'Sugador de Tinta','Sugador para retirar tinta do frasco com precisão, descartável.','Acessórios',19.90,'assets/img/sugador-tinta.jpg',25),(29,'Aparador de Agulhas','Aparador de agulhas para descarte seguro de material perfurocortante.','Acessórios',49.90,'assets/img/aparador-agulhas.jpg',18),(30,'Lâmpada de Bancada LED','Lâmpada de bancada LED com braço articulado, luz branca para precisão.','Acessórios',149.90,'assets/img/lampada-bancada.jpg',12),(31,'Cadeira de Tatuagem','Cadeira reclinável para tatuagem, ajuste de altura e apoio de braço.','Acessórios',1199.90,'assets/img/cadeira-tatuagem.jpg',4),(32,'Macacão de Proteção','Macacão descartável de proteção para tatuadores, pack com 5.','Higiene e Proteção',59.90,'assets/img/macacao-protecao.jpg',15),(33,'Protetor de Máquina','Protetor plástico descartável para máquina de tatuagem, pack com 100.','Higiene e Proteção',39.90,'assets/img/protetor-maquina.jpg',22),
        (34,'Kit Piercing Iniciante','Kit de piercing com agulhas, joias e materiais de higienização.','Piercing',199.90,'assets/img/kit-piercing.jpg',10),(35,'Agulha para Piercing 16G','Agulha estéril para piercing 16G, pack com 10 unidades.','Piercing',39.90,'assets/img/agulha-piercing.jpg',25),(36,'Joia de Titânio para Piercing','Joia de titânio para piercing, formato bola, 3mm, hipoalergênica.','Piercing',49.90,'assets/img/joia-titanio.jpg',30),
        (37,'Kit Cuidados Pós-Tatuagem','Kit de cuidados pós-tatuagem com pomada, sabonete e filme protetor.','Cuidados Pós-Tatuagem',79.90,'assets/img/kit-pos-tatuagem.jpg',18),(38,'Pomada Cicatrizante 30g','Pomada cicatrizante para tatuagem, 30g, acelera a regeneração.','Cuidados Pós-Tatuagem',39.90,'assets/img/pomada-cicatrizante.jpg',25),(39,'Protetor Solar Tattoo FPS 50','Protetor solar específico para tatuagens, FPS 50, 120ml.','Cuidados Pós-Tatuagem',59.90,'assets/img/protetor-solar-tattoo.jpg',20),(40,'Hidratante para Tatuagem','Hidratante específico para pele tatuada, 200ml, sem perfume.','Cuidados Pós-Tatuagem',34.90,'assets/img/hidratante-tattoo.jpg',22),
        (41,'Livro Flash Art Tattoo','Livro com flash arts variados para inspiração de tatuagens, 100 páginas.','Livros e Arte',89.90,'assets/img/livro-flash-tattoo.jpg',12),(42,'Caderno de Desenho A3','Caderno de desenho A3, 50 folhas, papel 180g para esboços.','Livros e Arte',49.90,'assets/img/caderno-desenho.jpg',18),(43,'Kit Lápis de Desenho','Kit com 12 lápis de desenho profissional, grafites variados.','Livros e Arte',59.90,'assets/img/kit-lapis.jpg',20),
        (44,'Transfer Stencil Térmico','Impressora térmica de stencil para tatuagem, alta precisão.','Materiais de Transfer',899.90,'assets/img/impressora-stencil.jpg',5),(45,'Estêncil Pré-Desenhado','Kit com 20 estênceis pré-desenhados variados, tamanhos diversos.','Materiais de Transfer',69.90,'assets/img/estencil-pre.jpg',15),
        (46,'Suporte para Máquina','Suporte de mesa para máquina de tatuagem, base estável.','Acessórios',59.90,'assets/img/suporte-maquina.jpg',18),(47,'Bandeja Organizadora','Bandeja organizadora para materiais de tatuagem, com divisórias.','Acessórios',39.90,'assets/img/bandeja-organizadora.jpg',22),(48,'Espelho de Mesa LED','Espelho de mesa com iluminação LED, para conferência de detalhes.','Acessórios',99.90,'assets/img/espelho-led.jpg',10),(49,'Bolsa para Materiais Tattoo','Bolsa organizadora para materiais de tatuagem, com alças e divisórias.','Acessórios',149.90,'assets/img/bolsa-tattoo.jpg',12);
`

// Tabela de compras e itens (AV3)
const ESTRUTURA_COMPRA = `
    CREATE TABLE compra (
        id int(11) NOT NULL AUTO_INCREMENT,
        cliente_id int(11) NOT NULL,
        data_compra datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        valor_total decimal(10,2) NOT NULL,
        status varchar(30) NOT NULL DEFAULT 'pendente',
        PRIMARY KEY (id),
        KEY fk_compra_cliente (cliente_id),
        CONSTRAINT fk_compra_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    CREATE TABLE item_compra (
        id int(11) NOT NULL AUTO_INCREMENT,
        compra_id int(11) NOT NULL,
        produto_id int(11) NOT NULL,
        quantidade int(11) NOT NULL,
        preco_unitario decimal(10,2) NOT NULL,
        subtotal decimal(10,2) NOT NULL,
        PRIMARY KEY (id),
        KEY fk_item_compra (compra_id),
        KEY fk_item_produto (produto_id),
        CONSTRAINT fk_item_compra FOREIGN KEY (compra_id) REFERENCES compra (id) ON DELETE CASCADE,
        CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produto (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

async function criar_tabelas() {
    const connection = await db.pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Criando tabela 'cliente'...");
        await connection.query(ESTRUTURA_CLIENTE);
        await connection.query(DADOS_CLIENTE);

        console.log("Criando tabela 'produto'...");
        await connection.query(ESTRUTURA_PRODUTO);
        await connection.query(DADOS_PRODUTO);

        console.log("Criando tabelas 'compra' e 'item_compra'...");
        await connection.query(ESTRUTURA_COMPRA);

        await connection.commit();
        console.log("Migration executada com sucesso!");
        process.exit(0);
    } catch (error) {
        await connection.rollback();
        console.log(error)
        process.exit(1);
    } finally {
        connection.release();
    }
}
criar_tabelas()
