# Development Journal about the project

### Origins: 
Nodeblogger started as a simple static node.js website intended to hold the History about my family ancestry. During the first weeks of development the future need to add more articles on the site started to bother me, so the project had to change to be a more dynamic platform. The first idea was to use renderable markdown files stored in a folder on the project. Later the idea changed to a database storable articles list. Since that, the basic structure of Nodeblogger don't changed to much at all. 

### Commits good practices:
Asking for reviews on community an advice about using some convention on commiting was received. So about commit 4325f5e, the project started using *conventional commits* convention. Currently the project is maintained by just one person, but that was not a excuse to not use good practices on commiting. Besides, from time to time I gonna need to spend some days on another projects and as you already know, a week away makes our projects seems new to us.

### Lint:
Another advice from community was about linting the code, so about commit 3bbd242, following good practices, I started using *ESLint* with Airbnb Style. I cant say I didn't feels the impact. Since start of my studies in Web Development, I've made my own style, but now completely agree that a Code is written not to computer, but to others programmer.

### First deploy:
As the the project becomes to grow, I've decided to try a demo deploy. The service choose was Heroku. A simple setup was made, a mysql service added , github integrated and the project was put online. Now we can see a Nodebloger demonstration on [this link](https://kortkamp-nodeblogger.herokuapp.com/). The process of deploying in Heroku is really simple and, the best part, totally free. 