

function validateSubmit(){
    
    
    //console.log('validanting submit')
    
    
    commentValidate = validateComment(document.forms["new-comment"]["comment"].value)
    emailValidation = validateEmail(document.forms["new-comment"]["email"].value)
    nameValidation = validateName(document.forms["new-comment"]["author"].value)

    

    result = commentValidate && emailValidation && nameValidation
    return(result)
    
}

function validateComment(comment){
    //console.log(comment)
    if(comment) 
        return true
    return false
}

function validateName(name){
    
    if(name) 
        return true
    return false
}
function validateEmail(email){
    if(email){
        if(email.split('@'))
            if(email.split('@').length == 2){
                
                if(email.split('@')[1].split('.'))
                    if(email.split('@')[1].split('.').length > 1){
                        
                        return(true)
                    }
            }
                
    }
  //  if(email.split('@').length == 2 && email.split('@')[1].split('.').length > 1) 
   //     return true
    return false
}