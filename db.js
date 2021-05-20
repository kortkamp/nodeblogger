dbInfo = require('./db_info.json')



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : dbInfo.host,
  user     : dbInfo.user,
  password : dbInfo.password,
  database: dbInfo.database
});



function getChilds(id) {
    //connection.connect();
    console.log(connection.state)
    queryString = "SELECT `id`, `desc`,EXTRACT(YEAR FROM birth) as `birth` FROM `position` WHERE `parent_id`=?";

    return new Promise( resolve => {connection.query(queryString, [id], function(err, rows) {
        if (err) {
            console.log(err)    
            //throw err
        };
        //console.log('The result is: ', rows);
        
        resolve(rows)
      })}
    );
      
    
    
 }

async function getFormatedChilds(id){
    let children = await getChilds(id)

    for(let index in children){
        children[index]["hasChild"] = await hasChild(children[index].id)
    }

    return(children)

    //= {"result":children};

}

async function hasChild(id){
    let children = await getChilds(id);
    //console.log("chindren id:" + id + " number " + children.length)
    
    if(children.length > 0)
        return(true)
    else
        return(false)
} 

module.exports = {getFormatedChilds,getChilds,hasChild}

