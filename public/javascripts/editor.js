var currentArticleId;

function selectArticle(id){
    currentArticleId = id;
    // class selected must highlight post
    $('#post'+id).addClass('selected');
    $('#post'+id).siblings().removeClass('selected');
}


function loadArticle(id){
    $.getJSON("article?id="+id, 
          function(data) {
             u_data = data;
            // console.log(u_data)
             putOnScreen(u_data);
          });
}

var defaultNewPost = {  allow_commentary:true,
                        status:0,
                        type:0
                    };

// fill form fields with 'data'
function putOnScreen(data){
    var keys = Object.keys(data);
    document.forms["new-article"].reset();
    for(key of keys)
        document.forms["new-article"][key].value = data[key];
}



function newPost(){
    $('#post'+currentArticleId).removeClass('selected');
    $('input[name="id"]').prop("disabled", true);
    currentArticleId = undefined;

    document.forms["new-article"].reset();

    putOnScreen(defaultNewPost);
    // default fields
   


}

function savePost(){
    

    // must validate all mandatory fields
    if(currentArticleId){
        $.ajax({
            type: "POST",
            url: 'article',
            data: $("#article-form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                setStatus(data); // show response from the php script.
            }
        });
    }

}

function editPost(){
    if(currentArticleId){
        $('input[name="id"]').prop("disabled", false);
        loadArticle(currentArticleId)

    }
}

function deletePost(){
    // ask for confirmation
    if(currentArticleId){
        $.ajax({
            type: "DELETE",
            url: 'article',
            data: 'id='+currentArticleId ,
            success: function(data)
            {
                setStatus(data); // show response from the php script.
            }
        });

    }else
        setStatus('Select a article to Delete')
}

function setStatus(text){
    $('label.status').text(text);
}