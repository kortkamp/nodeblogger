function sendContact(){
   
    if(validateContactForm()){
        $.ajax({
            type: "POST",
            url: "/make_contact",
            data: $(".contact-form").serialize(), // serializes the form's elements.
            success: function(data, textStatus, xhr,request)
            {
               // console.log(xhr.status)

                $('.contact-body').hide();
                $('.contact-header').hide();

                if(xhr.status == 201){
                    $('.response-sucess').show();
                }else{
                    $('.response-error'),show();
                }
                //console.log(data) 
            }        
        });
    }
}

function validateContactForm(){

    var name = $('input[name="name"]').val()
    var email = $('input[name="email"]').val()
    var message = $('textarea[name="message"]').val()

    isNameValid = validateName(name);
    isEmailValid = validateEmail(email);
    isMessageValid = validateMessage(message);

    result = isNameValid && isEmailValid && isMessageValid
    return(result) 
}

function validateMessage(message){
    
    if(message) 
        return true
    $('textarea[name="message"]').css("border","1px solid red");
    return false
}

function validateName(name){
    if(name) 
        return true
    $('input[name="name"]').css("border","1px solid red");
    return false
}

// TODO, change to REGEX validation
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
    $('input[name="email"]').css("border","1px solid red");
    return false
}