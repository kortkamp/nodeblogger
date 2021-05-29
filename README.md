# kortkamp.org
Website for Kortkamp family

# História
    A ideia inicial do projeto foi uma migração de um blog Wordpress para a Node/Express. Inicialmente o objetivo era construir um site com apenas uma página estática com a apresentação e uma página com a árvore genealógica. À medida que fui implementando a idéia inicial percebi que o **Express.js** facilitava muito a construção de aplicações maiores e que com o uso de **routes** e de uma **View Engine** eu poderia construir a página no formato de Blog, armazenando apenas as informações essenciais de cada post e renderizando as páginas direto pelo Node.js. 

# Banco de Dados
    O Banco de Dados escolhido foi o Mysql devido aos dados da árvore genealógica já estarem nesse formato, assim aproveitei para  
    Devido à ideia de migrar todos os dados gravados para o Banco de Dados visando facilitar backup e migração, decidi passar a usar o ORM Sequelize para gerenciar o mysql.
