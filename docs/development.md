# Development Journal about the project

## Origins: 
Nodeblogger started as a simple static node.js website intended to hold the History about my family ancestry. During the first weeks of development the future need to add more articles on the site started to bother me, so the project had to change to be a more dynamic platform. The first idea was to use renderable markdown files stored in a folder on the project. Later the idea changed to a database storable articles list. Since that, the basic structure of Nodeblogger don't changed to much at all. 

## Commits good practices:
Asking for reviews on community an advice about using some convention on commiting was received. So about commit 4325f5e, the project started using *conventional commits* convention. Currently the project is maintained by just one person, but that was not a excuse to not use good practices on commiting. Besides, from time to time I gonna need to spend some days on another projects and as you already know, a week away makes our projects seems new to us.

## Lint:
Another advice from community was about linting the code, so about commit 3bbd242, following good practices, I started using *ESLint* with Airbnb Style. I cant say I didn't feels the impact. Since start of my studies in Web Development, I've made my own style, but now completely agree that a Code is written not to computer, but to others programmer.

## First deploy:
As the the project becomes to grow, I've decided to try a demo deploy. The service choose was Heroku. A simple setup was made, a mysql service added , github integrated and the project was put online. Now we can see a Nodebloger demonstration on [this link](https://kortkamp-nodeblogger.herokuapp.com/). The process of deploying in Heroku is really simple and, the best part, totally free. 

## First major refactor:
Some decisions I've made on development of Nodeblogger didn't makes me very proud. So in a point where I find the very first initial goals were achieved in the project, the need to start a refactor in some points that could be very better than they really was, came to the foreground.

### Task #1

- **Problem**: The first refactor task gonna be in the articles list cache. A decision that I've made on early stage of development was to cache all blog articles in memory, so we will not need to make a request to the SQL Server every time we make a GET request to an article. The counter effect of that approach seems to be the memory needed to store all the blog posts. In a environment with large amount of postages , the memory cache of all articles would become a problem as we will not have control of how much memory will be in use. But Nodeblogger is intended to be a micro blogger platform and, mainly, a learning project. For a blog with just a few articles, this approach seems pretty reasonable. Well, my refactor task will not be about caching the articles, but about the position and dispersion of the cache variables, their use and mainly, the function created up update in runtime the cache. Currently, at top of app.js we load on postsData the complete list of blog articles. We use that data a little behind, at handling 404 errors. Later at runtime, the data is used another time in routes/blog when rendering the articles requested by the clients and the cache may be updated in route/service when we add or delete a new article on database. The way that I'm handling all that seems fuzzy even to me, so to solve this will be my first refactor task.

- **Solution**: The first refactor task was completed by adding a singleton class SiteCache in a module named cache.js. Now we call this module where we need, update it when made necessary and the cache data gonna be shared across our app. 

- **Conclusion**: Implementation of singleton pattern in Node.js is quite simple. When a module exports a new instance of class, Node makes a cache of this module returning the same instance when the module is required again and, voilà, we have a singleton.
