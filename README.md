# kortkamp.org
Blog feito em Node.js

# Funcionalidades
- Múltiplas páginas renderizáveis armazenadas em tabela do BD
- Área de comentários
- Formulário de contato
- Editor de postagens
- Renderizador de Markdown para o conteúdo das postagens.
- Carregamento ultra rápido com artigos armazenados em Memória.


# Desenvolvimento
A ideia inicial do projeto foi a migração de um blog Wordpress para a Node/Express. Inicialmente o objetivo era construir um site com apenas uma página estática com a apresentação e uma página com a árvore genealógica. À medida que fui implementando a idéia inicial percebi que o **Express.js** facilitava muito a construção de aplicações maiores e que com o uso de **routes** e de uma **View Engine** eu poderia construir a página no formato de Blog, armazenando apenas as informações essenciais de cada post e renderizando as páginas direto pelo Node.js. 

## Banco de Dados
O Banco de Dados escolhido foi o Mysql devido aos dados da árvore genealógica já estarem nesse formato. 
À medida que implementei o formato blog com diferentes páginas de conteúdos, decidi aproveitar o Banco de Dados que já estaria rodando no servidor e adicionei uma área de comentários para cada página de artigo com uma API simples para receber ou postar os comentários. 
À medida que o projeto passou a fazer mais uso do Banco de Dados decidi passar a usar o ORM **Sequelize** para gerenciar o mysql o que proporcional um aprendizado valioso sobre essa tecnologia, já que antes esse trabalho era feito via lib mysql escrevendo diretamente as queries em SQL.
Após essa mudança foi muito simples mudar a localização dos artigos da página para do diretório /blog para uma tabela no banco de dabos.

## Integração com Gmail
A Página precisaria de uma área de contatos, então decidi usar o **nodemailer** para integrar ao email da família. Devido às exigências de segurança do gmail , tive dificuldades para fazer altenticação simples e foi necessário usar OAuth2 , oque foi bem útil no aprendizado dessa tecnologia. Implementei um serviço *mailer.js* para receber o access_token via API do Google e fazer o envio dos emails de contato e notificações ao administrador da página.

## Editor de Postagens
A fim de simplicar o processo de postagens no blog, decidi adicionar uma página de edição **CRUD**.


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/kortkamp/kortkamp.org

# Acesse a pasta do projeto no terminal/cmd
$ cd kortkamp.org

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Pug](https://pugjs.org/)


