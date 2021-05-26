USE FAMILY;
#DROP TABLE comments;
CREATE TABLE IF NOT EXISTS `comments` (
    `id` int(11) NOT NULL auto_increment ,
    `parent_post` varchar(100) NOT NULL,
    `parent_comment` int(11),
    `author` varchar(100) NOT NULL,
    `mail`  varchar(320),
    `text`  varchar(5000),
    `create_date` DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100 ;


INSERT INTO comments (parent_post,parent_comment,author,mail,text,create_date) VALUES
( 'post1', NULL, 'Marcelo Kortkamp', 'mail@meumeail.com ', 'Parabéns pelo trabalho',now()),
( 'post2', NULL, 'Marcelo Kortkamp', 'mail@meumeail.com ', 'Eita nóis',now()),
( 'post3', NULL, 'joao', '', '... sei lá',now())
;

