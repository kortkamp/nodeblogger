

var currentArticleId;


var postHeaderList;

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
    if(true){
        $.ajax({
            type: "POST",
            url: 'article',
            data: $("#article-form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                setStatus(data); // show response from the php script.
                loadPostList();
            }
        });
    }
}

function editPost(){
    $('textarea.input-field').show();
    $('.textarea-preview').hide();
    if(currentArticleId){
        $('input[name="id"]').prop("disabled", false);
        loadArticle(currentArticleId)
    }
}

function deletePost(){
    // ask for confirmation
    if(currentArticleId){
        askForConfirmation(() => {
            $.ajax({
                type: "DELETE",
                url: 'article',
                data: 'id='+currentArticleId ,
                success: function(data)
                {
                    setStatus(data); // show response from the php script.
                    document.forms["new-article"].reset();
                    loadPostList();
                    
                }
            });
        },"Confirm Delete Post:" + currentArticleId)
    }else
        setStatus('Select a article to Delete')
}



function previewArticle(){


    $('.textarea-preview').html(marked($('textarea.input-field').val()))

    $('textarea.input-field').hide();
    $('.textarea-preview').show();
}




function setStatus(text){
    $('label.status').text(text);
}

function loadPostList(){
    $.getJSON("list?test=test", 
    function(data) {
        postHeaderList = data;
        var postContainer = $('ol.post-list');
        postContainer.html(''); 
        for(let post of postHeaderList){
            console.log(post.title)
            postContainer.append('<li class="post-item" id="post'+ post.id +'" onclick="selectArticle(' + post.id + ')"><cite>' + post.id + ' <spam>'+ post.title+'</spam></cite></li>')
        }
    });
}



var confirmationCallback
// we must pass a function to be called when confirm true.
function askForConfirmation(callback,questionText){
    confirmationCallback = callback;
    if(questionText){
        $('.confirm-title').text(questionText);
    }else{
        $('.confirm-title').text('Confirm');
    }
    $('.confirm-container').show();
}
// must be called by button click to confirm
function confirmOperation(option){
    if(option && confirmationCallback)
        confirmationCallback();

    $('.confirm-container').hide();
    confirmationCallback = undefined;
}