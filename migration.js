require("dotenv").config()
const db = require("./db")

async function criar_tabelas() {
    try {
        await db.pool.query(`
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

            INSERT INTO cliente VALUES 
                (12,'Nicolas Galvão','123.456.789-00','(42)99966-4444','galvao@gmail.com','$2b$10$N8b2YuzXWdMJVAAd670qG.ScLlmdFsuTJ7C6/GWtMKWhj8O0pU6Pu'),
                (13,'Nicolas Galvão','123.456.789-02','(42)99966-4444','galvao2@gmail.com','$2b$10$rNwWgUx8kezhoZXXuVG7NeBXqPFAzpkc37Sg4P.ETVtiSaWWqBHxy'),
                (14,'Patrick','123.123.123-12','(42)999669966','patrick123@gmail.com','$2b$10$MZMnDj10f7JnV6ArP.5hm.TAHDZ5NwECYSw6i5kbNowwhPuqbC/W.'),
                (19,'Richard','148.211.069-57','(42) 99931-865','bellusci.richard@escola.pr.gov.br','$2b$10$v3aTKV7iVqrcBJozlOZwie8I7yO2CyQIfuVk4uxR2RSDPELZSeyxS'),
                (28,'Patrick','111.222.333-49','(42)99999-4444','patrick67@gmail.com','$2b$10$QRU70xwZs0JYccsQcf/BFe7IIGYaqlS0xb.TIkGsv7UKviM2A26pq'),
                (29,'Kauã silva de lima','152.915.999-79','(42)99999-4444','kaua.lima11@escola.pr.gov.br','$2b$10$Ax80a.N/1RUsBU48IO1hX.d4hyiNt/15aV8.8VJuPziVuzTwGe8ly'),
                (30,'Bruno','120.897.429-76','(42)99830-3607','derbli@gmail.com','$2b$10$t8fYQCnQRXxvbLczF6YJNu31UvNT1qWhZ1r9GiftnFLy1rABdFKfG'),
                (31,'Guilherme','111.333.444-78','(42)55555-9999','poisler456@gmail.com','$2b$10$r9QmvPFklIeeoCoHfISzGeJNnjScdYm4JZiNBmffsblVzk48uyHXa'),
                (32,'Rhuan','137.604.709-80','(42)99999-4444','rhuan@gmail.com','$2b$10$QA3mNPH90POZijUIri.hKO5pQQH223KGKyYOYycQA0GtPuKGhPrkS');

            DROP TABLE IF EXISTS produto;
            CREATE TABLE produto (
                id int NOT NULL AUTO_INCREMENT,
                nome varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
                descricao text COLLATE utf8mb4_general_ci NOT NULL,
                categoria varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
                preco decimal(10,2) NOT NULL,
                caminho_img varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
                quantidade_img int NOT NULL,
                PRIMARY KEY (id)
                ) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            INSERT INTO produto VALUES (50,'Caneta Esferográfica Azul BIC','Caneta esferográfica clássica na cor azul, escrita suave e durável. Ideal para uso diário.','Canetas',2.50,'img/caneta_azul_bic.jpg',1),(51,'Caneta Esferográfica Preta BIC','Caneta esferográfica preta de alta qualidade, ponta média 1.0mm.','Canetas',2.50,'img/caneta_preta_bic.jpg',1),(52,'Caneta Esferográfica Vermelha BIC','Caneta esferográfica vermelha, perfeita para correções e destaques.','Canetas',2.50,'img/caneta_vermelha_bic.jpg',1),(53,'Caneta Gel Preta Pilot G2','Caneta gel de escrita suave e intensa, retrátil, ponta 0.7mm.','Canetas',8.90,'img/caneta_gel_pilot.jpg',2),(54,'Caneta Marcador Permanente Preto','Marcador permanente à prova dágua, ideal para papel, plástico e metal.','Marcadores',4.50,'img/marcador_permanente.jpg',1),(55,'Caneta Marca-Texto Amarela Stabilo','Marca-texto fluorescente amarela, ponta chanfrada.','Marcadores',3.90,'img/marca_texto_amarela.jpg',1),(56,'Caneta Marca-Texto Verde Stabilo','Marca-texto fluorescente verde, ideal para estudos.','Marcadores',3.90,'img/marca_texto_verde.jpg',1),(57,'Caneta Marca-Texto Rosa Stabilo','Marca-texto fluorescente rosa, ponta chanfrada.','Marcadores',3.90,'img/marca_texto_rosa.jpg',1),(58,'Lápis Preto HB Nº2 Faber-Castell','Lápis grafite HB tradicional, excelente para escrita e desenho.','Lápis',1.80,'img/lapis_hb.jpg',1),
                (59,'Lápis de Cor 12 Cores Faber-Castell','Conjunto com 12 cores vibrantes, madeira certificada.','Lápis de Cor',18.90,'img/lapis_cor_12.jpg',2),(60,'Lápis de Cor 24 Cores Faber-Castell','Conjunto completo com 24 cores, ideal para estudantes.','Lápis de Cor',32.90,'img/lapis_cor_24.jpg',2),(61,'Borracha Branca Soft Faber-Castell','Borracha macia que não danifica o papel, apaga limpo.','Borrachas',2.20,'img/borracha_branca.jpg',1),(62,'Borracha Colorida Escolar','Borracha colorida em formato de animal, divertida para crianças.','Borrachas',3.50,'img/borracha_colorida.jpg',1),(63,'Apontador Simples Metal','Apontador metálico com depósito, afia lápis com precisão.','Apontadores',4.90,'img/apontador_metal.jpg',1),(64,'Apontador Elétrico a Pilha','Apontador elétrico prático, funciona com 2 pilhas AA.','Apontadores',29.90,'img/apontador_eletrico.jpg',2),(65,'Régua 30cm Transparente','Régua de plástico transparente de 30 centímetros com escala milimetrada.','Réguas',3.50,'img/regua_30cm.jpg',1),(66,'Régua 50cm em Acrílico','Régua longa de 50cm em acrílico resistente.','Réguas',8.90,'img/regua_50cm.jpg',1),(67,'Esquadro 45° Plástico','Esquadro de 45 graus em plástico resistente, ideal para geometria.','Instrumentos de Desenho',5.50,'img/esquadro_45.jpg',1),(68,'Transferidor 180° Transparente','Transferidor semicircular de 180 graus com escala clara.','Instrumentos de Desenho',4.90,'img/transferidor.jpg',1),
                (69,'Compasso Escolar Metálico','Compasso de metal com ponta de grafite, ajuste preciso.','Instrumentos de Desenho',12.90,'img/compasso.jpg',1),(70,'Caderno Universitário 10 Matérias','Caderno espiral 10 matérias, 200 folhas, capa dura.','Cadernos',24.90,'img/caderno_10mat.jpg',2),(71,'Caderno Universitário 1 Matéria','Caderno espiral 1 matéria, 96 folhas, capa flexível.','Cadernos',12.90,'img/caderno_1mat.jpg',1),(72,'Caderno Brochura 96 Folhas','Caderno brochura costurado, 96 folhas, capa cartão.','Cadernos',9.90,'img/caderno_brochura.jpg',1),(73,'Agenda 2025 Executiva','Agenda diária 2025 com capa dura e elástico de fechamento.','Agendas',39.90,'img/agenda_2025.jpg',3),(74,'Bloco de Notas Adesivas 3M','Pacote com 4 blocos de notas adesivas coloridas (amarelo, rosa, azul e verde).','Blocos e Post-it',14.90,'img/postit_colorido.jpg',1),(75,'Bloco de Anotações A5','Bloco de anotações tamanho A5, 100 folhas pautadas.','Blocos e Post-it',11.90,'img/bloco_a5.jpg',1),(76,'Pasta Sanfonada A4 12 Divisórias','Pasta sanfonada com 12 divisórias, fechamento com elástico.','Pastas e Organizadores',22.90,'img/pasta_sanfonada.jpg',2),(77,'Pasta Plástica com Elástico','Pasta plástica transparente com elástico, tamanho A4.','Pastas e Organizadores',6.90,'img/pasta_elastico.jpg',1),(78,'Envelope A4 Kraft','Envelope de papel kraft tamanho A4, pacote com 50 unidades.','Envelopes',18.90,'img/envelope_kraft.jpg',1),
                (79,'Envelope Branco Oficio','Envelope branco tamanho ofício, pacote com 100 unidades.','Envelopes',24.90,'img/envelope_branco.jpg',1),(80,'Grampeador de Mesa Médio','Grampeador de mesa para até 25 folhas, cor preta.','Grampeadores e Perfuradores',19.90,'img/grampeador.jpg',1),(81,'Grampos 26/6 Caixa 5000un','Caixa com 5000 grampos tamanho 26/6.','Grampeadores e Perfuradores',8.90,'img/grampos.jpg',1),(82,'Perfurador de Papel 2 Furos','Perfurador de mesa para 2 furos, capacidade 20 folhas.','Grampeadores e Perfuradores',16.90,'img/perfurador.jpg',1),(83,'Tesoura Escolar 13cm','Tesoura escolar com ponta arredondada, cabo ergonômico.','Tesouras',7.90,'img/tesoura_escolar.jpg',1),(84,'Tesoura Profissional 21cm','Tesoura profissional de aço inoxidável, cabo anatômico.','Tesouras',24.90,'img/tesoura_profissional.jpg',1),(85,'Cola Branca 90g','Cola branca escolar 90g, não tóxica.','Colas',4.50,'img/cola_branca.jpg',1),(86,'Cola Bastão 40g','Cola em bastão 40g, prática e limpa.','Colas',5.90,'img/cola_bastao.jpg',1),(87,'Fita Adesiva Transparente 48mm','Fita adesiva transparente larga, rolo 48mm x 50m.','Fitas Adesivas',9.90,'img/fita_transparente.jpg',1),(88,'Fita Crepe 18mm','Fita crepe 18mm x 50m, ideal para pintura e proteção.','Fitas Adesivas',6.90,'img/fita_crepe.jpg',1),(89,'Corretivo Líquido 18ml','Corretivo líquido branco com pincel, 18ml.','Corretivos',5.50,'img/corretivo_liquido.jpg',1),
                (90,'Fita Corretiva 5mm x 8m','Fita corretiva seca, aplicação limpa e rápida.','Corretivos',8.90,'img/fita_corretiva.jpg',1),(91,'Clips Coloridos Nº2 Caixa 100un','Caixa com 100 clips coloridos tamanho Nº2.','Clips e Prendedores',4.90,'img/clips_coloridos.jpg',1),(92,'Prendedor de Papel Preto 19mm','Caixa com 12 prendedores de papel pretos 19mm.','Clips e Prendedores',7.90,'img/prendedor_papel.jpg',1),(93,'Cartolina Branca 50x66cm','Cartolina branca 180g/m², pacote com 10 folhas.','Papéis Especiais',12.90,'img/cartolina_branca.jpg',1),(94,'Papel Colorido A4 120g','Pacote com 50 folhas de papel colorido A4 120g (cores sortidas).','Papéis Especiais',16.90,'img/papel_colorido.jpg',1),(95,'Papel Sulfite A4 75g 500 Folhas','Resma de papel sulfite A4 75g, 500 folhas, branco.','Papéis',22.90,'img/sulfite_a4.jpg',1),(96,'Papel Canson A4 180g','Pacote com 20 folhas de papel Canson A4 180g para desenho.','Papéis Especiais',19.90,'img/papel_canson.jpg',1),(97,'Estojo Escolar Duplo','Estojo escolar com dois compartimentos, zíper reforçado.','Estojo e Mochilas',29.90,'img/estojo_duplo.jpg',2),(98,'Calculadora Científica Casio','Calculadora científica com 240 funções, tela de 2 linhas.','Calculadoras',49.90,'img/calculadora_cientifica.jpg',2),(99,'Calculadora Básica 12 Dígitos','Calculadora de bolso básica com 12 dígitos, alimentada por energia solar.','Calculadoras',14.90,'img/calculadora_basica.jpg',1);



        `)
        console.log("✅ Estrutura e dados da tabela 'cliente' criados com sucesso!")
    } catch (error) {
        console.error("❌ Erro na migration:", error.message)
        throw error
    }
}

module.exports = { criar_tabelas }

// Se quiser rodar sozinho: node migration.js
if (require.main === module) {
    criar_tabelas().then(() => process.exit(0))
}