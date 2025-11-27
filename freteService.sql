-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: frete-service-database
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
-- Table structure for table `FRETE`
--

DROP TABLE IF EXISTS `FRETE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FRETE` (
  `id_frete` int NOT NULL AUTO_INCREMENT,
  `saida` varchar(255) DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `valor_frete` int DEFAULT NULL,
  `data_saida` datetime DEFAULT NULL,
  `data_chegada` datetime DEFAULT NULL,
  `prazo` int DEFAULT NULL,
  `distancia` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `caminhoneiro_id` int DEFAULT NULL,
  `carga_id` int DEFAULT NULL,
  `empresa_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_frete`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `FRETE_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `STATUS` (`id_status`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FRETE`
--

LOCK TABLES `FRETE` WRITE;
/*!40000 ALTER TABLE `FRETE` DISABLE KEYS */;
INSERT INTO `FRETE` VALUES (61,'Campo Mourão','Curitiba',1850,NULL,NULL,3,410,1,NULL,26,2,'2025-11-27 20:45:54'),(62,'Campo Mourão','Maringá',950,NULL,NULL,2,120,1,NULL,27,3,'2025-11-27 20:54:17'),(63,'Campo Mourão','Ponta Grossa',2100,NULL,NULL,4,320,1,NULL,28,4,'2025-11-27 20:54:17'),(64,'Campo Mourão','Cascavel',1300,NULL,NULL,2,180,1,NULL,29,5,'2025-11-27 20:54:17'),(65,'Campo Mourão','Foz do Iguaçu',2600,NULL,NULL,5,480,1,NULL,30,6,'2025-11-27 20:54:17'),(66,'Campo Mourão','Guarapuava',1100,NULL,NULL,2,150,1,NULL,31,7,'2025-11-27 20:54:17'),(67,'Campo Mourão','Paranaguá',3200,NULL,NULL,6,520,1,NULL,32,8,'2025-11-27 20:54:17'),(68,'Campo Mourão','São José dos Pinhais',1700,NULL,NULL,3,390,1,NULL,33,9,'2025-11-27 20:54:17'),(69,'Campo Mourão','Colombo',1200,NULL,NULL,1,210,1,NULL,34,10,'2025-11-27 20:54:17'),(70,'Campo Mourão','Campo Mourão',500,NULL,NULL,2,10,1,NULL,35,11,'2025-11-27 20:54:17'),(71,'Campo Mourão','Toledo',1400,NULL,NULL,2,200,1,NULL,36,12,'2025-11-27 20:54:17'),(72,'Campo Mourão','Apucarana',900,NULL,NULL,2,80,1,NULL,37,13,'2025-11-27 20:54:17'),(73,'Campo Mourão','Arapongas',950,NULL,NULL,3,90,1,NULL,38,14,'2025-11-27 20:54:17'),(74,'Campo Mourão','Umuarama',1600,NULL,NULL,5,250,1,NULL,39,15,'2025-11-27 20:54:17'),(75,'Campo Mourão','Pato Branco',2300,NULL,NULL,5,470,1,NULL,40,16,'2025-11-27 20:54:17'),(76,'Campo Mourão','Francisco Beltrão',2200,NULL,NULL,4,460,1,NULL,41,17,'2025-11-27 20:54:17'),(77,'Campo Mourão','Cianorte',1050,NULL,NULL,2,130,1,NULL,42,18,'2025-11-27 20:54:17'),(78,'Campo Mourão','Telêmaco Borba',1950,NULL,NULL,5,340,1,NULL,43,19,'2025-11-27 20:54:17'),(79,'Campo Mourão','Medianeira',2500,NULL,NULL,3,490,1,NULL,44,20,'2025-11-27 20:54:17'),(80,'Campo Mourão','Palmas',2400,NULL,NULL,4,480,1,1,45,21,'2025-11-27 20:54:17'),(81,'Campo Mourão','Marechal Cândido Rondon',2100,NULL,NULL,2,350,1,NULL,46,22,'2025-11-27 20:54:17'),(82,'Campo Mourão','Irati',1150,NULL,NULL,7,160,1,NULL,47,23,'2025-11-27 20:54:17'),(83,'Campo Mourão','Jacarezinho',1750,NULL,NULL,6,280,1,NULL,48,24,'2025-11-27 20:54:17'),(84,'Campo Mourão','União da Vitória',2250,NULL,NULL,4,370,1,NULL,49,25,'2025-11-27 20:54:17'),(85,'Campo Mourão','Paranavaí',950,NULL,NULL,2,90,1,NULL,50,26,'2025-11-27 20:54:17');
/*!40000 ALTER TABLE `FRETE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STATUS`
--

DROP TABLE IF EXISTS `STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STATUS` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STATUS`
--

LOCK TABLES `STATUS` WRITE;
/*!40000 ALTER TABLE `STATUS` DISABLE KEYS */;
INSERT INTO `STATUS` VALUES (1,'Disponivel'),(2,'Pendente'),(3,'Aprovado'),(4,'Em transporte'),(5,'Em rota de entrega'),(6,'Entregue');
/*!40000 ALTER TABLE `STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'frete-service-database'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-27 19:36:21
