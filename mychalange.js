$(document).ready(onHtmlLoaded);
function onHtmlLoaded(){


//flip function
$(".card").flip({
   axis: 'y',
   trigger: 'click',
   speed:'500',
   reverse: false,
});


//fade function on back side
 $(".card").on('flip:done',function(){
   
    const backSection=$(this).find(".back")
    backSection.toggleClass("fade");
    
    
 });

//scroll animate function on html
$('body').on('click','.contact-a', function(event) {
    
        var target = $.attr(this, 'href');
        console.log(target)
        console.log(target.length)
        if( target.length ) { 
           // event.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);
        }
    
});

} 




 