db = require('../db')
const Post = require('../models/Post');



async function listAllPosts(){
    try {
        const posts = await Post.findAll({
            where:{
                public:true,
            }
           // attributes: { exclude: ['content','updatedAt'] }
        });          
        return posts.map(obj => obj.dataValues)
    }catch (error){
        console.log(error);
        return([]);
    }
}



async function listAllHeaders(){
    try {
        const headers = await Post.findAll({
           attributes: { exclude: ['content'] }
        });          
        return headers.map(obj => obj.dataValues)
    }catch (error){
        console.log(error);
        return([]);
    }
}


async function getPostById(id){
    try {
        const post = await Post.findByPk(id,{
            raw:true
        });
       
        return post
        
    }catch (error){
        console.log(error);
        return;
    }
}

async function getPostContent(id){

    try {
        const post = await Post.findByPk(id,{
            where:{id:id},
            attributes: ['content']
        });
        return post.dataValues.content;

    }catch (error){
        console.log(error);
        return("");
    }
}


async function postArticle(data){
    //must test to prevent articles with same title
    try {  
        if(data.id){
            //update
            const createResult = await Post.update(data, {where:{id:data.id}})
        }else{
            //create
            const createResult = await Post.create(data)
        }
        
        return 'OK'
    }catch (error){
        console.log(error);
        return('ERROR in Database');
    } 
}

async function deleteArticle(id){
    console.log('delete article:' + id )
    try {  
        Post.destroy({ where: { id: id }});
        return('Deleted')
    }catch (error){
        console.log(error);
        return('ERROR in Database');
    } 

}

function getModelFields(){
    var postDataFields = [];
    var model = require('../models/Post');
    postFieldsArray = Object.keys(model.rawAttributes);
    for(let field of postFieldsArray)
        postDataFields.push({
            name:field,
            type:model.rawAttributes[field].type.key
        })
    return postDataFields;
}

async function addView(id){
    try{
        var post = await getPostById(id);
        return await Post.update({views:post.views+1}, {where:{id:id}});
    }catch(err){
        console.log(err)
    }  
}
async function addLike(id){
    try{
        var post = await getPostById(id);
        return await Post.update({likes:post.likes+1}, {where:{id:id}});
    }catch(err){
        console.log(err)
    }  
}

module.exports = {getPostById,listAllPosts,postArticle,getPostContent,listAllHeaders,getModelFields,deleteArticle,addView,addLike}