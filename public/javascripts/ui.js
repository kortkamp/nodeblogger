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


var masterHeader;
var masterHeaderHeight;
var masterBody;
var headerWrapperHeight;

// ==============  GO TOP BUTTON ===================
var goTopButton;// = $('#goTopButton');

$( document ).ready(function(){ // on page load
    
    masterHeader = $('.master-head');
    masterBody = $('.master-body')
    
    masterHeaderHeight = $('.master-head').height();
    headerWrapperHeight = $('.header-wrapper-container').height();
    masterHeader.css('top',-headerWrapperHeight + 'px');



    goTopButton = $('#goTopButton');

    goTopButton.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });

});



// ============== ON SCROLL ACTIONS ==================
$(window).scroll(function() {
    //console.log('.')

    if ($(window).scrollTop() > headerWrapperHeight) {
        masterHeader.addClass("sticky-master-head");
        masterBody.css('margin-top',masterHeaderHeight + 'px');
        
    } else {
        masterHeader.removeClass("sticky-master-head");
        masterBody.css('margin-top','0');
    }


    if ($(window).scrollTop() > 300) {
        goTopButton.addClass('show');
    } else {
        goTopButton.removeClass('show');
    }
});

