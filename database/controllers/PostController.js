db = require('../db')
const Post = require('../models/Post');

const STATUS = {
    ready:0,
    incomplete:1,
    deleted:2
    

}
const TYPE = {
    public:0,
    header_page:1,


}

async function listAllPosts(){
    try {
        const headers = await Post.findAll({
           // attributes: { exclude: ['content','updatedAt'] }
        });          
        return headers.map(obj => obj.dataValues)
    }catch (error){
        console.log(error);
        return([]);
    }
}

async function getPostById(id){
    try {
        const posts = await Comment.findAll({
            where:{id:id}
        });
                
        return posts.map(obj => obj.dataValues)
    }catch (error){
        console.log(error);
        return([]);
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
        const createResult = await Post.create(data)
        //return createResult
    }catch (error){
        console.log(error);
        return([]);
    } 
}

module.exports = {getPostById,listAllPosts,postArticle,getPostContent}