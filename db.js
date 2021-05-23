dbInfo = require('./db_info.json')



var mysql      = require('mysql');


var db_config = {
  host     : dbInfo.host,
  user     : dbInfo.user,
  password : dbInfo.password,
  database: dbInfo.database
};

//var connection = mysql.createConnection(db_config);



var connection;

handleDisconnect();

 
function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.
 
  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'ECONNRESET') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}
 



function getChilds(id) {
    //connection.connect();
    //console.log(connection.state)

    queryString = "SELECT `id`, `desc`,EXTRACT(YEAR FROM birth) as `birth` FROM `position` WHERE `parent_id`=?";

    return new Promise( resolve => {connection.query(queryString, [id], function(err, rows) {
        if (err) {
            //console.log(err)    
            console.log("error in db.getChilds")
            handleDisconnect();
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

