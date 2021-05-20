DROP DATABASE FAMILY;
CREATE DATABASE FAMILY;
USE FAMILY;
CREATE TABLE IF NOT EXISTS `position` (
`id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `desc` varchar(50) NOT NULL,
  `spouse` varchar(50) ,
  `birth` DATE ,
  `place` varchar(50)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=300 ;

INSERT INTO `position` (`id`, `parent_id`, `desc`, `spouse`,`birth`,`place`) VALUES
(2, 0,'Heirich Albert Kortkamp', 'Maria Elisabeth Schimidt', NULL, 'Siedenburg - Hannouver - DE' ),

(3, 2,'Carl Wilhelm Kortkamp', 'Francisca Maria Jorge', '1845-12-17', 'Euclidelandia-RJ' ),
(4, 2,'Henrique Kortkamp', 'Genuina Maria Cordeiro', '1848-04-19', 'Euclidelandia-RJ' ),
(5, 2,'Guilherme Kortkamp', '', '1851-05-08', 'Euclidelandia-RJ' ),
(6, 2,'Maria Germana Kortkamp', '', '1853-09-21', 'Euclidelandia-RJ' ),
(7, 2,'Sofia Kortkamp', '', '1857-11-25', 'Euclidelandia-RJ' ),
(8, 2,'Alberta Kortkamp', '', '1860-10-07', 'Euclidelandia-RJ' ),
(9, 2,'Maria Luiza Kortkamp', '', NULL, 'Euclidelandia-RJ' ),

(15, 3,'Francisca Kortkamp', '1872-12-03', NULL, 'Euclidelandia-RJ' ),
(16, 3,'Antonio Kortkamp', '', '1874-02-15', 'Euclidelandia-RJ' ),
(17, 3,'Emilia Kortkamp', '', '1876-04-10', 'Euclidelandia-RJ' ),
(18, 3,'Alfredo Kortkamp', '', '1878-01-01', 'Padua-RJ' ),
(19, 3,'Ernestina Kortkamp', '', '1885-01-01', 'Padua-RJ' ),
(20, 3,'A.(fem) Kortkamp', '', '1889-01-01', 'Padua-RJ' ),


(25, 4,'Guilherme Kortkamp', '', '1876-07-20', 'Euclidelandia-RJ' ),
(26, 4,'Antenor Kortkamp', '', '1876-07-20', 'Padua-RJ' ),
(27, 4,'Gerundino Kortkamp', '', '1881-01-01', 'Padua-RJ' ),
(28, 4,'Maria Angélica Kortkamp', '', '1883-01-01', 'Padua-RJ' ),
(29, 4,'Anizio Kortkamp', '', '1886-01-01', 'Padua-RJ' ),
(30, 4,'Francisco Kortkamp', '', '1888-01-01', 'Padua-RJ' ),








# Filhos do Jurundino
(40, 27, 'Israel Bastos Kortkamp', 'Sebastiana Kortkamp','1914-09-02','Padua-RJ'),
(50, 27, 'Augusto Bastos Kortkamp', 'Sebastiana Kortkamp','1912-05-01','Padua-RJ'),
(60, 27, 'Manoel Bastos Kortkamp', 'Irene Macedo Kortkamp','1923-07-05','Padua-RJ'),
(70, 27, 'Gloria DESAPARECIDA', ' ',NULL,'Padua-RJ'),
(80, 27, 'Tereza Kortkamp', ' ',NULL,'Padua-RJ'),
(90, 27, 'Maria Kortkamp Alves', ' ',NULL,'Padua-RJ'),

#Filhos do Manoel Bastos Kortkamp
(301, 60, 'Marcio Jose Macedo Campos', 'Marileide Teixeira Campos', NULL,'Cantagalo-RJ'),
(302, 60, 'Wilson Macedo Campos', 'Rosane Soares Campos', NULL,'Cantagalo-RJ'),
(303, 60, 'Manoel Rosalvo Macedo Campos', 'Andreia Campos', NULL,'Cantagalo-RJ'),
(304, 60, 'Maria Ezilda Campos Leal', 'Genezio Leal', NULL,'Cantagalo-RJ'),
(305, 60, 'Regina Maria Macedo Campos', 'Augusto', NULL,'Cantagalo-RJ'),
(306, 60, 'Ana Maria Campos Jardim', 'Jose Elimar Jardim', NULL,'Cantagalo-RJ'),
(307, 60, 'Maria Goreth Campos', 'Eugênio', NULL,'Cantagalo-RJ'),
(308, 60, 'Maria Suely Campos', '', NULL,'Cantagalo-RJ'),
(309, 60, 'Sandra Maria Campos', 'Gilberto', NULL,'Cantagalo-RJ'),
(310, 60, 'Heliana Campos', 'Loriano Almeida', NULL,'Cantagalo-RJ'),
(311, 60, 'Simone Campos', 'Cauby Melo Teixeira', NULL,'Cantagalo-RJ'),

#Filhos do Israel Bastos Kortkamp
(101, 40, 'Nilto Kortkamp',' ',NULL, ' ' ),
(102, 40, 'Nilta Kortkamp', 'Antonio Alves da Costa Filho', NULL,' '),
(103, 40, 'Maria Nilza Kortkamp', ' ', NULL,' '),
(104, 40, 'Nivaldina Kortkamp', ' ', NULL,' '),
(105, 40, 'Joao Batista Kortkamp', ' ', NULL,' '),

#Filhos do Augusto Bastos Kortkamp
(201, 50, 'Elvira Kortkamp', ' ', NULL,' '),
(202, 50, 'Wilson Kortkamp', ' ', NULL,' '),
(203, 50, 'Maria Luisa Kortkamp', ' ', NULL,' '),
(204, 50, 'Zilda Kortkamp', ' ', NULL,' '),
(205, 50, 'Iva Kortkamp', ' ', NULL,' '),
(206, 50, 'Diva Kortkamp', ' ', NULL,' '),
(207, 50, 'Julia Kortkamp', ' ', NULL,' '),
(208, 50, 'Maria Lucia Kortkamp', ' ', NULL,' '),
(209, 50, 'Celia Kortkamp', ' ', NULL,' '),
(210, 50, 'Ilzete Kortkamp', ' ', NULL,' '),
(211, 50, 'Sebastiao Fernandes Kortkamp', ' ', NULL,' '),
(212, 50, 'Nelson Kortkamp', ' ', NULL,' '),

#Filhos do Maria Kortkamp Alves
(601, 90, 'Lecy Kortkamp Alves', ' ',NULL,'Padua-RJ'),
(602, 90, 'Nadir Kortkamp Alves', ' ',NULL,'Padua-RJ'),
(603, 90, 'Euvira Kortkamp Alves', ' ',NULL,'Padua-RJ'),
(604, 90, 'Nilton Kortkamp Alves', ' ',NULL,'Padua-RJ'),
(605, 90, 'Lair Kortkamp Alves', ' ',NULL,'Padua-RJ'),
(606, 90, 'Sebastiao Kortkamp Alves', ' ',NULL,'Padua-RJ'),



## Netos de Manoel Bastos Kortkamp
#---------------------------------------------------------------------------------------------
#Filhos de Maria Tereza Kortkamp
(501, 80 , 'Neuza Kortkamp', ' ', NULL,' '),
(502, 80 , 'Manoel Kortkamp', ' ', NULL,' '),

#Filhos de Marcio Jose Macedo Campos
(3011, 301, 'Marcelo Teixeira Campos', 'Renata Cunha Cordeiro', '1982-12-24','Cantagalo-RJ'),
(3012, 301, 'Deiziany Teixeira Campos', 'Alcileno Araujo', '1984-05-06','Cantagalo-RJ'),

#Filhos de Wilson Macedo Campos
(3021, 302, 'Patrick Soares Campos', ' ', NULL,' '),

#Filhos de Maria Ezilda Campos Leal
(3041, 304, 'Angela Campos Leal', ' ', NULL,' '),
(3042, 304, 'Ricardo Campos Leal', ' ', NULL,' '),
(3043, 304, 'Vanuza Campos Leal', ' ', NULL,' '),
(3044, 304, 'Thiago Campos Leal', ' ', NULL,' '),

#Filhos de Regina Maria Macedo Campos
(3051, 305, 'Monara Campos Pereira', ' ', NULL,' '),
(3052, 305, 'Gustavo Campos', ' ', NULL,' '),

#Filhos de Ana Maria Campos Jardim
(3061, 306, 'Patricia Campos Jardim', ' ', NULL,' '),
(3062, 306, 'Prscila Campos Jardim', ' ', NULL,' '),

#Filhos de Maria Goreth Macedo Campos
(3071, 307, 'Kleyton Campos', ' ', NULL,' '),

#Filhos de Maria Suely Macedo Campos
(3081, 308, 'Luiz Rander Campos', ' ', NULL,' '),
(3082, 308, 'Ralph Junior Campos', ' ', NULL,' '),

#Filhos de Sandra Maria Campos
(3091, 309, 'Gilssandra Campos', ' ', NULL,' '),
(3092, 309, 'Gilciney Campos', ' ', NULL,' '),

#Filhos de Heliana Campos Almeida
(3101, 310, 'Bruno Campos Almeida', ' ', NULL,' '),
(3102, 310, 'Savio Campos Almeida', ' ', NULL,' '),
(3103, 310, 'Heric Campos Almeida', ' ', NULL,' '),

#Filhos de Simone Campos Teixeira
(3111, 311, 'Fernando Campos Teixeira', ' ', NULL,' '),
(3112, 311, 'Michele Campos Teixeira', ' ', NULL,' '),
(3113, 311, 'Gilliard Campos Teixeira', ' ', NULL,' '),
#---------------------------------------------------------------------------------------------

#Netos de Israel Bastos Kortkamp
#---------------------------------------------------------------------------------------------

#Filhos de Nilta Kortkamp
(1021, 102, 'Ana Cristina Kortkamp', ' ', NULL,' '),

#Filhos de Maria Nilza Kortkamp
(1031, 103, 'Flavia Kort', ' ', NULL,' '),
(1032, 103, 'Moana Kort', ' ', NULL,' '),
#---------------------------------------------------------------------------------------------



#Netos de Augusto Bastos Kortkamp
#---------------------------------------------------------------------------------------------
#Filhos de Sebastião Fernandes Kortkamp
(2111, 211, 'Antonio Augusto Kortkamp', ' ', NULL,' '),

#Filhos de Wilson Kortkamp
(2021, 202, 'Marilza Kortkamp', ' ', NULL,' '),
(2022, 202, 'Nelma Kortkamp', ' ', NULL,' '),
(2023, 202, 'Eliane Kortkamp', ' ', NULL,' '),
(2024, 202, 'Mauro Kortkamp', ' ', NULL,' '),
(2025, 202, 'Giseli Kortkamp', ' ', NULL,' '),
(2026, 202, 'Sergio Wilson Kortkamp', ' ', NULL,' '),
(2027, 202, 'Ralf Kortkamp', ' ', NULL,' '),
(2028, 202, 'Silas Kortkamp', ' ', NULL,' '),
(2029, 202, 'Felipe Kortkamp', ' ', NULL,' ')


#---------------------------------------------------------------------------------------------

;

ALTER TABLE `position`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `position`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=300;