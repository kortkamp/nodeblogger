# NodeBlogger
Platform for creating generic blogs made in Nodejs/Express.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/kortkamp/nodeblogger/fork)
![Lines of code](https://img.shields.io/tokei/lines/github/kortkamp/nodeblogger)

# Features
- Multiple pages stored in DB tables.
- Comments Area.
- Contact form.
- E-mail notifications about main events.
- Articles basic editor.
- Markdown render for the content of articles.
- Fast loading with pages cached in RAM.
- PUG backend Renderer.
- RESTful API for accessing main data.
- Multi-users, with login and JWT authentication.


# Geting Started

Go to [Geting Started Tutorial](https://github.com/kortkamp/nodeblogger/blob/main/docs/getting-started.md) and follow the basics steps start using Nodeblogger.

# todo list (submit a PR)
- [x] Logoff on Dashboard or Editor.
- [x] Option to define Homepage in Article Editor.
- [x] Create a publish article function.
- [x] Add a cool page for 404 Error.
- [ ] Add tools for markdown editing in Articles Editor.
- [ ] Add image uploader in Articles Editor.
- [ ] Save sketch when writing new article, so on logoff the content is preserved.
- [ ] Add Share (on social media) buttons.
- [ ] Option to comment on someone else's comment.
- [x] Count views on articles.
- [x] Add like Buttons on articles.
- [x] Add subcribing functionality and notify then about new articles posteds
- [x] Add unsubscribe service.
- [x] List articles by keywords or authors and route those lists.
- [ ] Change all project content to English( Sorry , I started it in Portuguese).
- [ ] Write tests.
- [ ] Overtake Wordpress as default Blog platform :joy:


# Contributing

Pull Requests and Issues are very welcome. For major modifications please open an Issue first and we gonna discuss about it.



# Technical

### Prerequisites

Before starting, you gonna need to have installation of the following tools on your system:
- [Git](https://git-scm.com), 
- [Node.js](https://nodejs.org/en/), 
- [MySQL Server](https://www.mysql.com/)

### 🎲 Running Nodeblogger (server)

```bash
# Clone this repository
$ git clone https://github.com/kortkamp/nodeblogger

# Go to the folder project
$ cd nodeblogger

# Install dependencies
$ npm install

# Configure db_info.json for your Mysql server
{   
    "host":"localhost",
    "user":"user",
    "password":"password",
    "database": "nodeblogger",
    "port": 3306
}

# Create database and tables
$ npm run databasebuild

# If this is your first installation of Nodeblogger create the online documentation
$ npm run docsbuild

# Run the project in development mode
$ npm run dev:server

# The server will start in port:3000 - go to http://localhost:3000 
```


### 🛠 Tecnologies

The following tecnologies where used in the project:

- Backend
    - [Node.js](https://nodejs.org/en/)
    - [Express.js](https://expressjs.com/)
- Database
    - [MySQL](https://www.mysql.com/)
    - [Sequelize](https://sequelize.org/)
- Render
    - [Pug](https://pugjs.org/)
- Fontend
    - [jQuery/Ajax](https://jquery.com/)
    - Plain CSS / JS


# Autor
   [Marcelo Kortkamp](https://github.com/kortkamp)