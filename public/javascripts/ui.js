window.addEventListener('resize', resizeUi);

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