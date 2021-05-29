USE FAMILY;
#DROP TABLE posts;


DROP TABLE post_keywords;
CREATE TABLE IF NOT EXISTS `post_keywords` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`keyword` VARCHAR(100),
	PRIMARY KEY (id)
) AUTO_INCREMENT=1 ;

INSERT INTO post_keywords (keyword) VALUES
('main'),('author'),('news'),('about');


DROP TABLE user;
CREATE TABLE if NOT EXISTS `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_name` VARCHAR(100),
	`password` VARCHAR(100),
	`name` VARCHAR(300),
	`mail`  varchar(320),
	`phone` VARCHAR(20),

	PRIMARY KEY (id)
)AUTO_INCREMENT=1;



drop table posts;
CREATE TABLE IF NOT EXISTS `posts` (
    `id` INT NOT NULL auto_increment ,
    `page_name` VARCHAR(200) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `post_description` VARCHAR(1000) NOT NULL,
    `author` varchar(100) NOT NULL,
    `create_date` DATETIME NOT NULL,
    `keywords` VARCHAR(1000),
    `comment_field` BOOL NOT NULL,
    `content`  TEXT NOT NULL,
    
    
    PRIMARY KEY (id)
) AUTO_INCREMENT=10 ;



INSERT INTO posts (page_name,title,post_description,author,create_date,keywords,comment_field,content) VALUES

( 'post1','história','A Origem e História da Família Kortkamp', 'Marcelo Kortkamp', NOW(),NULL, TRUE , 'A família Kortkamp tem uma longa História desde sua chegada ao Brasil...')

;
