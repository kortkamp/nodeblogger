const controller = require('./controllers/UserController');







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

    var user1 = {
      
            username:'marcelo22',
            password:'123456',
            admin:true,
            name:'Marcelo Kortkamp',
            email:'marcelusmedius2@gmail.com',
            phone:'997088801',
        
    }

    var user2 = {
        id:1,
        username:'marcelo7',
    }

    //result = await controller.createUser(user1)
    //.then(result => {console.log('SUCESSO>>>>>>');console.log(result)})
    //.catch(err => {console.log('ERRO>>>>>>>');console.log(err)})
    
    controller.validateUser({username:'marcelo',password:'1234526'}).then(res => console.log(res))

    //controller.validateUser(user1).then(res => console.log(res))

    //controller.alterUser(user1).then(res => console.log(res))

    //controller.getUser('marcelo2').then(ret => console.log(ret))
    //controller.listUsers().then(ret => console.log(ret))


    //console.log(children)
    //var children = await controller.getPostById(1)
    
    //result = await controller.listWhere({id:2})
    //result = await controller.postArticle(post3)
    //result = await controller.getPostContent(10)
    
    

})();
