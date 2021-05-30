db = require('../db')
const Comment = require('../models/Comment');


async function getComments(postName){
    try {
        const children = await Comment.findAll({
            where:{parent_post:postName}
            
        });
        // Here a part of code that Im not so proud. The best way to say if a family_member has children is to create a table of relations
        // But as our DB is very small , we'll not have problems with that.
        
        return children.map(obj => obj.dataValues)
    }catch (error){
        console.log(error);
        return([]);
    }
}




async function postComment(data){
    try {  
        const createResult = await Comment.create(data)
        //return createResult
    }catch (error){
        console.log(error);
        return([]);
    } 
}

module.exports = {getComments,postComment};