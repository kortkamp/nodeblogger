const controller = require('./controllers/PostController');







(async() => {

    var post1 = {
        page_name:"historia",
        title:"A Historia",
        description:"A história desde as origens ao estabelecimento no Brasil",
        author:"Marcelo Kortkamp",
        keywords:"historia, origens",
        allow_commentary:true,
        content:"A história da familia começa no Reino de Hanover, na atual Alemanha"
    }
    var post3 = {
        page_name:"post3",
        title:"A Vinda",
        description:"anha ao Brasil",
        author:"Marcelo Kortkamp",
        keywords:"rigens",
        allow_commentary:true,
        content:"A viagem naquela época '''era muito complicada , a saída se deu no porto de Hamburgo em 1825 durando algumas seamanas'''"
    }
    
    
    //console.log(children)
    //var children = await controller.getPostById(1)
    
    result = await controller.listWhere({id:2})
    //result = await controller.postArticle(post3)
    //result = await controller.getPostContent(10)
    
    console.log(result)
    
})();


/*

*/