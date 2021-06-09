db = require('../db')
const { raw } = require('body-parser');
const Subscriber = require('../models/Subscriber');


async function getSubscribers(){
    try {
        const subscribers = await Subscriber.findAll({    
            raw:true
        });
     
        
        return subscribers
    }catch (error){
        console.log(error);
        return([]);
    }
}

async function addSubscribers(data){
    try {  
        const createResult = await Subscriber.create(data)
        //return createResult
    }catch (error){
        console.log(error);
        return([]);
    } 
}
async function removeSubscriber(data){
    try {  
        const destroyresult = await Subscriber.destroy({
            where:{
                email:data.email,
            }
        })
        //return createResult
    }catch (error){
        console.log(error);
        return([]);
    } 
}

module.exports = {};