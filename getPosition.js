db = require ('./db')

async function getFamilyPosition(id){

    let result;
    //db.connect();

    if(id == 0){

        let [first] = await db.getChilds(0)

        first["children"] = await db.getFormatedChilds(first.id)

        result = first;

    }else if (id > 0){
        let children = await db.getFormatedChilds(id)

        result = {"result":children};
        
        
    }

    /*
    {"result":[
            {"id":"3","desc":"Carl Wilhelm Kortkamp","birth":"1845","hasChild":true},
            {"id":"4","desc":"Henrique Kortkamp","birth":"1848","hasChild":true},
            {"id":"5","desc":"Guilherme Kortkamp","birth":"1851","hasChild":false},
            {"id":"6","desc":"Maria Germana Kortkamp","birth":"1853","hasChild":false},
            {"id":"7","desc":"Sofia Kortkamp","birth":"1857","hasChild":false},
            {"id":"8","desc":"Alberta Kortkamp","birth":"1860","hasChild":false},
            {"id":"9","desc":"Maria Luiza Kortkamp","birth":null,"hasChild":false}
    ]}

    */
    

    console.log(await db.hasChild(id))

    return result
    //db.disconnect();


  
    
}


module.exports = {getFamilyPosition}


/*
<?php
function db() {
   // TODO: Replace these variables
   $dsn = 'mysql:host=localhost;dbname=FAMILY';
   $username = 'marcelo';
   $password = '42632827';
   $options = array(
      PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
   );
   return new PDO($dsn, $username, $password, $options);
}

function getChilds($dbconn, $id) {
   $stmt = $dbconn->prepare("SELECT `id`, `desc`,EXTRACT(YEAR FROM birth) as `birth` FROM `position` WHERE `parent_id`=?");
   $stmt->execute(array($id));
   return $stmt;
}

$dbconn = db();

$id = filter_input(INPUT_GET,"id", FILTER_VALIDATE_INT);
$stmt = getChilds($dbconn, $id);

if($id == 0) {
   // Initial load: Get the first children too
   $row = $stmt->fetch(PDO::FETCH_ASSOC);

   $stmt2 = getChilds($dbconn, $row['id']);
   $i_j = 0;
   $childs = array();
   while($childrow = $stmt2->fetch(PDO::FETCH_ASSOC)) {
      $stmt3 = getChilds($dbconn, $childrow['id']);
      $hasChildRow = $stmt3->rowCount();
      if($hasChildRow > 0) {
         $hasChild = true;
      } else {         
         $hasChild = false;
      }
      
      $childs[$i_j] = array("id" => $childrow['id'], "desc" => $childrow['desc'],"birth" => $childrow['birth'], "hasChild" => $hasChild);
      $i_j++;
   }

   echo json_encode(array("id" => $row['id'], "desc" => $row['desc'],"birth" => $childrow['birth'] , "children" => $childs));
} else {
   // Just check if there are children
   $i_i = 0;
   $childs = array();
   
   while($childrow = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $stmt3 = getChilds($dbconn, $childrow['id']);
      $hasChildRow = $stmt3->rowCount();
      if($hasChildRow > 0) {
         $hasChild = true;
      } else {
         $hasChild = false;
      }
      
      $childs[$i_i] = array("id" => $childrow['id'], "desc" => $childrow['desc'],"birth" => $childrow['birth'], "hasChild" => $hasChild);
      $i_i++;     
   }
   
   echo json_encode(array("result" => $childs));
}
?>



*/