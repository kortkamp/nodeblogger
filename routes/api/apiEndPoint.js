var express = require('express');
var routes = express.Router();


function setEndPointController(Controller){
  
    console.log(Controller);

    //(async () => {await Controller.index().then(res => console.log(res))})()
    
    routes.get('/', Controller.index);

    routes.get('/:id', Controller.show);

    routes.post('/', Controller.store);

    routes.put('/:id', Controller.update);

    routes.delete('/:id', Controller.destroy);
}

module.exports = (EndPointController) => {
        
        setEndPointController(EndPointController);
        return routes
    };