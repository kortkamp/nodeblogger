//window.addEventListener('resize', resizeUi);

function resizeUi(){

    let width = window.innerWidth
    headerImages = this.document.getElementsByClassName('header-wrapper')[0].children
    
    headerImages = $('.header-wrapper img')
    //console.log(headerImages)
    if(width < 530){
        headerImages.hide()
    }else{
        headerImages.show()
    }

}

var comment;

function loadComments(post,parentDiv){
    console.log('load comments for ' + post + ' in ' + parentDiv);
    
    comment = parentDiv;
    console.log(parentDiv);

    $.get("getComments?post=" + post, 
          function(data) {
             u_data = data;
             console.log(data)
             comment.innerHTML = data
          });

}