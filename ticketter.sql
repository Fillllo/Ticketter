-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 13 juin 2022 à 21:14
-- Version du serveur :  10.4.16-MariaDB
-- Version de PHP : 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ticketter`
--

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE `compte` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`id`, `login`, `password`, `type`) VALUES
(1, 'Chris_user', '098f6bcd4621d373cade4e832627b4f6', 'user'),
(2, 'Chris_dev', '098f6bcd4621d373cade4e832627b4f6', 'dev'),
(4, 'dev2', '098f6bcd4621d373cade4e832627b4f6', 'dev'),
(5, 'dev3', '098f6bcd4621d373cade4e832627b4f6', 'dev');

-- --------------------------------------------------------

--
-- Structure de la table `historique_basculement`
--

CREATE TABLE `historique_basculement` (
  `id_basculement` int(11) NOT NULL,
  `id_emetteur` int(11) NOT NULL,
  `id_recepteur` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `historique_basculement`
--

INSERT INTO `historique_basculement` (`id_basculement`, `id_emetteur`, `id_recepteur`, `message`, `id_ticket`, `date`) VALUES
(1, 2, 4, '', 55, NULL),
(2, 2, 5, 'Tiens bg', 55, NULL),
(3, 2, 4, 'Tiens bg', 55, NULL),
(4, 2, 4, '', 55, NULL),
(5, 2, 5, 'Tiens bg', 58, NULL),
(6, 2, 4, 'Je te le donne', 51, NULL),
(7, 2, 4, '', 52, NULL),
(8, 2, 4, 'Je te le donne', 53, NULL),
(9, 4, 2, 'Tiens je te donne ca je n\'y arrive pas', 51, NULL),
(10, 2, 4, 'Son ecran est fissuré, je suis pas carglass', 54, NULL),
(11, 2, 4, 'Test', 51, NULL),
(12, 4, 2, 'Test2', 51, NULL),
(13, 2, 4, '', 51, '2021-12-02'),
(14, 4, 2, 'xcvxv', 51, '2021-12-02'),
(15, 2, 4, 'Tiens je te donne ca', 51, '2021-12-02'),
(16, 4, 2, '', 52, '2021-12-02'),
(17, 2, 4, '', 52, '2022-04-15'),
(18, 2, 5, 'fdfdfsd', 60, '2022-06-01'),
(19, 2, 5, 'J\'ai besoin d\'une meilleure expertise', 65, '2022-06-06');

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

CREATE TABLE `ticket` (
  `id_ticket` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `probleme` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'Problem',
  `dev_affecte` varchar(25) NOT NULL,
  `etat` int(1) NOT NULL DEFAULT 0,
  `resolution` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ticket`
--

INSERT INTO `ticket` (`id_ticket`, `id_user`, `titre`, `probleme`, `type`, `dev_affecte`, `etat`, `resolution`) VALUES
(70, 1, 'MaPêche ne fonctionne pas', 'Je n\'arrives pas a accéder à MaPêche', 'Problem', '', 0, ''),
(71, 1, 'La carte ne s\'affiches pas', 'Je n\'arrives pas a voir la carte de MaPêche', 'Problem', '', 0, ''),
(72, 1, 'sqddqs', 'qsdqsddqs', 'Problem', '', 0, ''),
(73, 1, 'sdqdqs', 'sqdqsdqsd', 'Problem', '', 0, ''),
(74, 1, 'sqdqd', 'qdqsddsq', 'Problem', '', 0, ''),
(75, 1, 'dsqdqdssd', 'qsdqsdqsd', 'Problem', '', 0, ''),
(76, 1, 'sqdqsdd', 'qsdqsdqds', 'Problem', '', 0, '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `historique_basculement`
--
ALTER TABLE `historique_basculement`
  ADD PRIMARY KEY (`id_basculement`),
  ADD KEY `fk_emeteur` (`id_emetteur`),
  ADD KEY `fk_recepteur` (`id_recepteur`),
  ADD KEY `fk_id_ticket` (`id_ticket`);

--
-- Index pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id_ticket`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `compte`
--
ALTER TABLE `compte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `historique_basculement`
--
ALTER TABLE `historique_basculement`
  MODIFY `id_basculement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id_ticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
