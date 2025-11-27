-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: backEnd-db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CAMINHONEIRO`
--

DROP TABLE IF EXISTS `CAMINHONEIRO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CAMINHONEIRO` (
  `id_caminhoneiro` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `veiculo_id` int DEFAULT NULL,
  PRIMARY KEY (`id_caminhoneiro`),
  KEY `usuario_id` (`usuario_id`),
  KEY `veiculo_id` (`veiculo_id`),
  CONSTRAINT `CAMINHONEIRO_ibfk_5` FOREIGN KEY (`usuario_id`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CAMINHONEIRO_ibfk_6` FOREIGN KEY (`veiculo_id`) REFERENCES `VEICULO` (`id_veiculo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CAMINHONEIRO`
--

LOCK TABLES `CAMINHONEIRO` WRITE;
/*!40000 ALTER TABLE `CAMINHONEIRO` DISABLE KEYS */;
INSERT INTO `CAMINHONEIRO` VALUES (1,3,1),(2,4,NULL);
/*!40000 ALTER TABLE `CAMINHONEIRO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CARGA`
--

DROP TABLE IF EXISTS `CARGA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CARGA` (
  `id_carga` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `peso` int NOT NULL,
  `valor_carga` int NOT NULL,
  `imagemCarga_id` int DEFAULT NULL,
  `tipoCarga_id` int DEFAULT NULL,
  PRIMARY KEY (`id_carga`),
  KEY `imagemCarga_id` (`imagemCarga_id`),
  KEY `tipoCarga_id` (`tipoCarga_id`),
  CONSTRAINT `CARGA_ibfk_3` FOREIGN KEY (`imagemCarga_id`) REFERENCES `IMAGEM_CARGA` (`id_imagemCarga`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CARGA_ibfk_4` FOREIGN KEY (`tipoCarga_id`) REFERENCES `TIPO_CARGA` (`id_tipo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CARGA`
--

LOCK TABLES `CARGA` WRITE;
/*!40000 ALTER TABLE `CARGA` DISABLE KEYS */;
INSERT INTO `CARGA` VALUES (26,'Carga de grãos','Carga de grãos para exportação, composta por soja selecionada, acondicionada em silos herméticos, destinada ao porto de Paranaguá para embarque internacional. Produto com certificação de origem e rastreabilidade.',10000,5000,4,1),(27,'Carga de grãos','Remessa de milho de alta qualidade, colhido em Campo Mourão, transportado em caminhão graneleiro, com destino a indústria de alimentos para produção de amido e derivados.',10000,5000,4,1),(28,'Carga de grãos','Carga de trigo premium, ensacado e paletizado, destinada à moagem em moinhos de Ponta Grossa, com controle de umidade e laudo fitossanitário.',10000,5000,4,1),(29,'Carga de grãos','Frete de feijão carioca, colhido em Apucarana, para distribuição em supermercados da região metropolitana de Curitiba. Produto embalado a vácuo.',10000,5000,4,1),(30,'Carga de grãos','Transporte de arroz integral, produzido em União da Vitória, com destino a exportação via Porto de Paranaguá. Carga rastreada e segurada.',10000,5000,4,1),(31,'Carga viva','Transporte frigorificado de suínos vivos, com controle de temperatura e bem-estar animal, para abate em frigorífico certificado. Veículo equipado com sistema de ventilação.',10000,5000,8,1),(32,'Carga viva','Remessa de bovinos de raça nelore, embarcados em caminhão boiadeiro, com destino a fazenda de engorda em Cascavel. Documentação sanitária em dia.',10000,6000,8,1),(33,'Carga viva','Transporte de aves vivas, galinhas poedeiras, para granja em Maringá. Carga monitorada por GPS e equipe especializada.',10000,6000,8,1),(34,'Carga viva','Frete de peixes tilápia, acondicionados em tanques oxigenados, para indústria de processamento em Foz do Iguaçu. Garantia de qualidade e frescor.',10000,6000,8,1),(35,'Carga viva','Transporte de ovinos, raça santa inês, para feira agropecuária em Londrina. Veículo adaptado para pequenos animais.',10000,6000,8,1),(36,'Carga de cimento','Carga de cimento Portland ensacado, para obra de construção civil em Curitiba. Produto paletizado, com laudo de resistência e entrega programada.',12000,7000,11,2),(37,'Carga de cimento','Remessa de cimento a granel, destinado à fábrica de pré-moldados em Ponta Grossa. Caminhão equipado com sistema de descarga pneumática.',12000,7000,11,2),(38,'Carga de cimento','Transporte de cimento branco especial, para acabamento de obras residenciais em Maringá. Produto com certificação ISO.',12000,7000,11,2),(39,'Carga de pedras','Frete de brita 1 e 2, extraída em pedreira de Campo Mourão, para pavimentação de rodovia estadual. Carga pesada, com controle de peso na origem.',12000,7000,11,3),(40,'Carga de madeira','Transporte de madeira serrada de pinus, para indústria moveleira em Francisco Beltrão. Produto com selo de manejo sustentável.',10000,6500,5,4),(41,'Carga de pallets','Remessa de pallets de madeira tratados, para centro de distribuição logístico em São José dos Pinhais. Produto certificado para exportação.',10000,8000,2,5),(42,'Carga de fertilizantes','Carga de fertilizante NPK, ensacado e paletizado, para revenda agrícola em Guarapuava. Produto com laudo de composição química.',10000,7000,4,6),(43,'Carga de fertilizantes','Transporte de ureia granulada, para aplicação em lavoura de soja em Toledo. Carga protegida contra umidade.',10000,7000,4,6),(44,'Carga de combustível','Frete de diesel S10, transportado em caminhão tanque, para abastecimento de frota agrícola em Umuarama. Carga com seguro ambiental.',8000,5000,7,7),(45,'Carga de combustível','Transporte de etanol hidratado, para posto de combustível em Colombo. Veículo com sistema de contenção de vazamentos.',8000,5000,7,7),(46,'Carga de tratores','Remessa de trator John Deere modelo 6110, novo, para concessionária em Pato Branco. Carga com escolta e seguro total.',15000,15000,6,9),(47,'Carga de tratores','Transporte de trator Massey Ferguson modelo MF 4275, revisado, para fazenda em Telêmaco Borba. Carga paletizada e amarrada.',15000,15000,6,9),(48,'Carga de cegonha','Carga de veículos leves, modelo sedan, para concessionária em Paranavaí. Transporte tipo cegonha, com rastreamento em tempo real.',7800,10000,3,10),(49,'Carga de algodão','Frete de fardos de algodão, colhidos em Guaíra, para indústria têxtil em Jacarezinho. Produto embalado e protegido contra umidade.',7800,10000,9,11),(50,'Carga de bebidas','Transporte de bebidas refrigerantes e água mineral, para distribuidora em Assis Chateaubriand. Carga paletizada e refrigerada.',7800,10000,10,12);
/*!40000 ALTER TABLE `CARGA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EMPRESA`
--

DROP TABLE IF EXISTS `EMPRESA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EMPRESA` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cnpj` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `avaliacao` int DEFAULT NULL,
  `localidade` varchar(255) NOT NULL,
  `imagemEmpresa_id` int DEFAULT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `imagemEmpresa_id` (`imagemEmpresa_id`),
  CONSTRAINT `EMPRESA_ibfk_1` FOREIGN KEY (`imagemEmpresa_id`) REFERENCES `IMAGEM_EMPRESA` (`id_imagemEmpresa`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EMPRESA`
--

LOCK TABLES `EMPRESA` WRITE;
/*!40000 ALTER TABLE `EMPRESA` DISABLE KEYS */;
/*!40000 ALTER TABLE `EMPRESA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IMAGEM_CARGA`
--

DROP TABLE IF EXISTS `IMAGEM_CARGA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IMAGEM_CARGA` (
  `id_imagemCarga` int NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagemCarga`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IMAGEM_CARGA`
--

LOCK TABLES `IMAGEM_CARGA` WRITE;
/*!40000 ALTER TABLE `IMAGEM_CARGA` DISABLE KEYS */;
INSERT INTO `IMAGEM_CARGA` VALUES (1,'uploads/1758840576191.png'),(2,'uploads/1758843408499.png'),(3,'uploads/1758843416372.png'),(4,'uploads/1758843420343.png'),(5,'uploads/1758843425400.png'),(6,'uploads/1758843430224.png'),(7,'uploads/1758843434438.png'),(8,'uploads/1758844035698.png'),(9,'uploads/1758844045833.png'),(10,'uploads/1758844052988.png'),(11,'uploads/1758844384504.png');
/*!40000 ALTER TABLE `IMAGEM_CARGA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IMAGEM_EMPRESA`
--

DROP TABLE IF EXISTS `IMAGEM_EMPRESA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IMAGEM_EMPRESA` (
  `id_imagemEmpresa` int NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagemEmpresa`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IMAGEM_EMPRESA`
--

LOCK TABLES `IMAGEM_EMPRESA` WRITE;
/*!40000 ALTER TABLE `IMAGEM_EMPRESA` DISABLE KEYS */;
INSERT INTO `IMAGEM_EMPRESA` VALUES (1,'uploads/1758834373571.png'),(2,'uploads/1758834382408.png'),(3,'uploads/1758834389741.png'),(4,'uploads/1758834397062.png'),(5,'uploads/1758834428300.png'),(6,'uploads/1758834434279.png'),(7,'uploads/1758834439674.png'),(8,'uploads/1758834444942.png'),(9,'uploads/1758834449469.png'),(10,'uploads/1758834453979.png'),(11,'uploads/1758834458899.png'),(12,'uploads/1758834463798.png'),(13,'uploads/1758834468264.png'),(14,'uploads/1758834473071.png'),(15,'uploads/1758834478571.png'),(16,'uploads/1758834483905.png'),(17,'uploads/1758834489198.png'),(18,'uploads/1758834493837.png'),(19,'uploads/1758834498869.png'),(20,'uploads/1758834503621.png'),(21,'uploads/1758834511878.png'),(22,'uploads/1758834517518.png'),(23,'uploads/1758834521835.png'),(24,'uploads/1758834526297.png'),(25,'uploads/1758834532031.png');
/*!40000 ALTER TABLE `IMAGEM_EMPRESA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IMAGEM_USUARIO`
--

DROP TABLE IF EXISTS `IMAGEM_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IMAGEM_USUARIO` (
  `id_imagem` int NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagem`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IMAGEM_USUARIO`
--

LOCK TABLES `IMAGEM_USUARIO` WRITE;
/*!40000 ALTER TABLE `IMAGEM_USUARIO` DISABLE KEYS */;
INSERT INTO `IMAGEM_USUARIO` VALUES (1,'uploads/1758842188557.jpeg'),(2,'uploads/1758842229962.jpeg');
/*!40000 ALTER TABLE `IMAGEM_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IMAGEM_VEICULO`
--

DROP TABLE IF EXISTS `IMAGEM_VEICULO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IMAGEM_VEICULO` (
  `id_imagemVeiculo` int NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagemVeiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IMAGEM_VEICULO`
--

LOCK TABLES `IMAGEM_VEICULO` WRITE;
/*!40000 ALTER TABLE `IMAGEM_VEICULO` DISABLE KEYS */;
INSERT INTO `IMAGEM_VEICULO` VALUES (1,'uploads/1758842526222.png');
/*!40000 ALTER TABLE `IMAGEM_VEICULO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIPO_CARGA`
--

DROP TABLE IF EXISTS `TIPO_CARGA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TIPO_CARGA` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIPO_CARGA`
--

LOCK TABLES `TIPO_CARGA` WRITE;
/*!40000 ALTER TABLE `TIPO_CARGA` DISABLE KEYS */;
INSERT INTO `TIPO_CARGA` VALUES (1,'Grãos'),(2,'Cimento'),(3,'Pedras'),(4,'Madeira'),(5,'Pallets'),(6,'Fertilizantes'),(7,'Combustivel'),(8,'Carga viva'),(9,'Tratores'),(10,'Cegonha'),(11,'Algodao'),(12,'Bebidas');
/*!40000 ALTER TABLE `TIPO_CARGA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `cnh` varchar(255) NOT NULL,
  `datanascimento` datetime DEFAULT NULL,
  `imagemUsuario_id` int DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_usuario`),
  KEY `imagemUsuario_id` (`imagemUsuario_id`),
  CONSTRAINT `USUARIO_ibfk_1` FOREIGN KEY (`imagemUsuario_id`) REFERENCES `IMAGEM_USUARIO` (`id_imagem`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'$2b$10$i6Z1QU9B14pZZ/tRQEbrzO3J1wP3GbWbs0NyLrltq.KdphSJP.0hy\r\n$2b$10$1e8KW.St7OPaYMewl29TNuvxrut.mn2laYL6nS8JNXW5qWQQOEVT2\r\n$2b$10$ym4gMvQlo1JD9UZqBFCwXu91fJ7nwBxZ6LV0NYbYqF.1LWuUfI1dK','Leonardo Nunes Decaris','leonardodecaris@outlook.com','10765482967','E','2025-09-06 22:21:43',NULL,0),(2,'$2b$10$WR4/W0vJiDnR4zIcEaKe6..tH7m7mw9ugLYV6Y/Mej39QXA33w86i','João da Silva','usuario@email.com','12345678900','E','2025-09-07 00:00:00',NULL,1),(3,'$2b$10$ym4gMvQlo1JD9UZqBFCwXu91fJ7nwBxZ6LV0NYbYqF.1LWuUfI1dK','Lucas Caravalho Pedrozo','lucaspedroozoo@hotmail.com','12105625967','D','2025-09-25 23:17:08',2,0),(4,'$2b$10$WR4/W0vJiDnR4zIcEaKe6..tH7m7mw9ugLYV6Y/Mej39QXA33w86i','João da Silva','usuario@email.com','66908315070','E',NULL,NULL,0);
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VEICULO`
--

DROP TABLE IF EXISTS `VEICULO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VEICULO` (
  `id_veiculo` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `placa` varchar(255) DEFAULT NULL,
  `quilometragem` int DEFAULT NULL,
  `ano` int DEFAULT NULL,
  `capacidade` int NOT NULL,
  `imagemVeiculo_id` int DEFAULT NULL,
  PRIMARY KEY (`id_veiculo`),
  KEY `imagemVeiculo_id` (`imagemVeiculo_id`),
  CONSTRAINT `VEICULO_ibfk_1` FOREIGN KEY (`imagemVeiculo_id`) REFERENCES `IMAGEM_VEICULO` (`id_imagemVeiculo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VEICULO`
--

LOCK TABLES `VEICULO` WRITE;
/*!40000 ALTER TABLE `VEICULO` DISABLE KEYS */;
INSERT INTO `VEICULO` VALUES (1,'Volvo','FH16 540','AFY6167',600000,2014,70,1);
/*!40000 ALTER TABLE `VEICULO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VEICULO_TIPO_CARGA`
--

DROP TABLE IF EXISTS `VEICULO_TIPO_CARGA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VEICULO_TIPO_CARGA` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoCarga_id` int DEFAULT NULL,
  `veiculo_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipoCarga_id` (`tipoCarga_id`),
  KEY `veiculo_id` (`veiculo_id`),
  CONSTRAINT `VEICULO_TIPO_CARGA_ibfk_5` FOREIGN KEY (`tipoCarga_id`) REFERENCES `TIPO_CARGA` (`id_tipo`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `VEICULO_TIPO_CARGA_ibfk_6` FOREIGN KEY (`veiculo_id`) REFERENCES `VEICULO` (`id_veiculo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VEICULO_TIPO_CARGA`
--

LOCK TABLES `VEICULO_TIPO_CARGA` WRITE;
/*!40000 ALTER TABLE `VEICULO_TIPO_CARGA` DISABLE KEYS */;
/*!40000 ALTER TABLE `VEICULO_TIPO_CARGA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'backEnd-db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-27 19:34:55
