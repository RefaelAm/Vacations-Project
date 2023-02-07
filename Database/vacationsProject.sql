-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 28, 2023 at 12:44 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsProject`
--
CREATE DATABASE IF NOT EXISTS `vacationsProject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsProject`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
(1, 4),
(2, 2),
(2, 4),
(2, 5),
(4, 3),
(4, 5),
(5, 3),
(5, 6),
(6, 2),
(25, 3),
(27, 3),
(29, 3),
(31, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'User',
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `role`, `firstName`, `lastName`, `username`, `password`) VALUES
(1, 'Admin', 'Chewbacca', 'Wookie', 'rrrrr', '5003cc02790ec20a75fefe02d66c0e5aa8b20bf1c851031d5df1c34bcffea6c754bf360d2d5fabecb99a70d3b101fcc470bc31a016a74104877e276d31bc94c3'),
(2, 'User', 'Obi Wan', 'Kenobi', 'jediMaster', '13157bcdee19c43d79cf14ffe47b4763a234411f4313af7e15f23559151590f2ff8f87d9a6cd83c2f5c89659cc05a21a871a6a6da71a204e012aa5ddc9fe2ad3'),
(3, 'User', 'Han', 'Solo', 'hanShotFirst', '8cc024602bcbdf6c17115f671acd93d002766cb695d6c0f33ff1ce658d5a21afbf1561e77277e6c3d3e85c96ef71376612ce5edddf697ba324c86d549c6031a7'),
(4, 'User', 'Leia', 'Organa', 'princessLeia', '8607b1eec4683314588eca1c71a19e4a2d1724279b8da28bf392774522bae91a509a64807bfa2bdfce3d9cacd9d4cea53d55cbef9fd0759fae2eb3f041dd76e5'),
(5, 'User', 'Qui Gon', 'Jinn', 'qgj123', '3001dc1835b1e837f87664e90f8f855c380355e6003efaed2073bc94f495a9727fde7764184850e8a339e116b1fcbcc90d42451b6f9eefee2426587645f7877d'),
(6, 'User', 'Sheev', 'Palpatine', 'senatorPalpatine', '712539f25957a5557e96c5c81ce6cac72dfe1da08ff741bf001ae186f9d8f6a99a3e8f5f8a700591b5ee11dfc16375a712dd6bbffc2dd0822b9ff45cb67f4a88');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Tatooine', 'A harsh desert planet orbiting twin suns in the galaxys outer rim.', '2023-03-02', '2023-03-09', 7000, 'Tatooine.jpeg'),
(2, 'Naboo', 'A green peaceful planet on the border of the outer rim.', '2025-06-12', '2025-07-01', 30000, '124b6bbd-a744-4a34-8c77-165370c56f8f.jpeg'),
(3, 'Hoth', 'A desolate ice planet in the outer rim of the galaxy.', '2027-10-28', '2027-11-07', 10000, 'Hoth.jpeg'),
(4, 'Kashyyyk', 'A dense forest planet in the southwestern quadrant of the galaxy.', '2023-03-17', '2023-03-28', 5000, 'Kashyyyk.jpeg'),
(5, 'Voss', 'A plentiful planet in an allied sector of the outer rim.', '2023-10-11', '2023-10-17', 9500, 'Voss.jpeg'),
(6, 'Bespin', 'A giant gas planet with flying cities, in the western sector of the outer rim teretories.', '2028-07-26', '2028-07-28', 4000, 'Bespin.jpeg'),
(25, 'Dantooine', 'A  lush planet located in the Raioballo sector\'s Dantooine system of the Outer Rim Territories.', '2023-08-25', '2023-09-08', 15000, '0b28294b-3244-4faf-8cba-76074f115988.jpeg'),
(26, 'Geonosis', 'or Geonosia. A desolate desert planet located in the outer rim terretories.', '2023-10-10', '2023-10-15', 8000, '42164b9c-993e-4bfd-99ea-f16fbcf7b73d.jpeg'),
(27, 'Jakku', 'A desolate desert planet in the inner rim.', '2023-05-31', '2023-06-02', 950, 'd8b2537a-36da-4152-95e0-2b1da87d01f7.jpeg'),
(28, 'Lola Sayu', 'a volcanic and sulfurous planet located within the Outer Rim Territories.', '2026-09-28', '2026-10-01', 1200, '4383bbd4-2278-46b7-9d12-09f948f6a8a6.jpeg'),
(29, 'Onderon', ' A jungle world located within the Inner Rim.', '2024-02-14', '2024-03-09', 5750, '48f9dbf9-c1a8-4ddf-8ff9-50f1736c74cc.webp'),
(30, 'Saleucami', 'A name that translated into \"oasis,\" A planet located in the Outer Rim Territories.', '2023-04-15', '2023-05-01', 30000, 'c4332da9-e2f1-49e1-8ef6-ce4a96a08e64.png'),
(31, 'Takodana', 'A remote, neutral planet located in the Mid Rim', '2023-08-30', '2023-09-02', 2000, '34bee55c-b5b5-4931-a313-4c972a62456a.webp'),
(32, 'Umbara', 'known as the \"Shadow World\" due to the lack of sunlight on its surface, a planet located within the Expansion Region.', '2023-07-29', '2023-08-10', 2200, '83794978-8697-44f8-8845-0a63958c8da6.jpeg'),
(33, 'Cantonica', 'A desert planet in the Cantonica system within the Corporate Sector of the galaxy\'s Outer Rim Territories. ', '2023-06-15', '2023-06-28', 4400, '52e94c08-4d27-4d31-a10f-a9f227b70d26.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`vacationId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
