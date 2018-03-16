$(document).ready(onHtmlLoaded);
function onHtmlLoaded(){

//TYPE WRITE function
typeWord();
function typeWord() {

        var index = 0,
            count = 0;
        var word =  '';
        var words = ["a developer", "adventuress", "looking for new challenges", "looking for new friends", 
        " waiting for a nice team to adopt me", "hoping for a great!"];
        nextWord()

        function type(word) {
            setTimeout(function() {
                if (word.length > 0) {
                    $('.typer').append(word.shift());
                    type(word);
                } else if (word.length === 0) {
                   pause();
                  
                }
            }, 100)
        }

        function untype() {
            setTimeout(function() {
                word = $('.typer').html().split('');
                word.pop();
                if (word.length > 0) {
                   
                    $('.typer').html(word)
                    untype();
                } else if (word.length === 0) {
                    $('.typer').empty();
                    nextWord();
                }
            }, 100);
        }

        function pause() {
            setTimeout(function() {
                untype();
            }, 200);
        }

        function nextWord() {
            index = count % 6;
            count++;
            word = words[index].split('');
            type(word);
        }
};

 //LIGHT-BOX 

$(".logo-portofolio").click(openLightBox);
$(".search-sign").click(openLightBox);

 //OPEN FUNCTION LIGHTBOX + Carusel function

function openLightBox(){
    
    $($(this).parent()[0].children[2]).css("display","block");
    //CARUSEL function $(function(){})
    setTimeout(function(){
        $('.jcarousel')
        .on('jcarousel:create jcarousel:reload', function() {
            var element = $(this),
                width = element.innerWidth();
                element.jcarousel('items').css('width', width + 'px');
               
        })
        .jcarousel({
            list: '.jcarousel-list',   
            items: '.jcarousel-item',
            animation: 'slow',
            transitions: true,

        });

        $('.jcarousel-control-prev')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1'
        });

        $('.jcarousel-control-next')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1'
        });

        $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .jcarouselPagination();

    },100)
}

$(".close-cursor").click(closeLightBox);
$(".close-button").click(closeLightBox);

//CLOSE FUNCTION LIGHTBOX(PORTOFOLIO)

function closeLightBox(){
    $($(this).parent()[0]).css("display","none");
}
//SEE MORE function
$(".see-more").click(function(e){
    e.preventDefault()
    const colapsed=$($(this).parent()["0"]).parent().find(".colapsed")["0"]
    $(colapsed).show();
    $(this).hide()
})

//SEE LESS function
$(".see-less").click(function(e){
    e.preventDefault()
    const visible=$(this).parent()["0"]
    $(visible).hide();
    const seemore= $($(this).parent()["0"]).parent().find(".see-more")["0"]
    $(seemore).show();
    
})

function toLocaleDateStringSupportsLocales() {
    try {
      new Date().toLocaleDateString('i');
    } catch (e) {
      return e.name === 'RangeError';
    }
    return false;
}

// Date function
const date=new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
const currentDate=date.toLocaleDateString('en-GB',options)

//Manipulating DOM WEATHER DESCRIPTION

const weather=document.getElementsByClassName("weather-description")[0];
weather.innerHTML='<div class="date"> Hy, today is '+currentDate+'</div>'+
                 '<p>You whant to get out and you don’t know what to Wear ?</p>'+
                 '<div id="weatherbtn"> Get weather </div>'+
                '<div class="displayWeather">'+
                '<div class="temperature"></div>'+
                '</div>'
                 
const otherLocation=document.createElement("div");
otherLocation.className="weatherOtherLocation";
otherLocation.innerHTML='<p> You can get the weather from other location too </p>'+
                        '<div class="otherLocation">'+
                        '<div class="formdiv">'+
                        '<input type="text" name="regionnweather" id="country" value="" placeholder="Country">'+
                        '<input type="text" name="regionnweather" id="region" value="" placeholder="Region/State">'+
                        '<input type="text" name="regionnweather" id="location" value="" placeholder="Location">'+
                         '</div>'+
                        '<div id="weatherotherLocationbtn"> Get weather </div>'+
                        '<div class="displayWeather">'+
                        '<div class="temperature"></div>'+
                        
                        '</div>'
                        
weather.appendChild(otherLocation);  


const temperature=$(".temperature")[0];
const temperature1=$(".temperature")[1];
$(temperature).hide();
$(temperature1).hide();    
        

//get the weather using current location
$("#weatherbtn").click(function(){
  
    $(temperature).show();  

    temperature.innerHTML='<div class=spinner>'+
                            '<div class="bounce1"></div>'+
                            '<div class="bounce2"></div>'+
                            '<div class="bounce3"></div>'+
                            '<div class="bounce4"></div>'+
                            '<div class="bounce5"></div>'+
                            '<div class="bounce6"></div>'+
                        '</div>'

    getTheLocation
       .then(function(location){
           getNameFromGeolocation(location)
               .then(function(geocodeArr){
                   getWatherCurrentLocation(geocodeArr,temperature)
               })
           
       })
       
});

//get the weather using lat and long from googleAPY
$("#weatherotherLocationbtn").click(function(){
 
    $(temperature1).show(); 
   
    temperature1.innerHTML='<div class=spinner>'+
                            '<div class="bounce1"></div>'+
                            '<div class="bounce2"></div>'+
                            '<div class="bounce3"></div>'+
                            '<div class="bounce4"></div>'+
                            '<div class="bounce5"></div>'+
                            '<div class="bounce6"></div>'+
                        '</div>'
            getLocationGoogleAPI()
            .then(function(googleApyArr){
             getWatherGoogleApi(googleApyArr,temperature1);
           })
         
    
});


}

const getTheLocation=new Promise (function(resolve,reject){
    navigator.geolocation.watchPosition(function(position){
    const locationLatitude=position.coords.latitude;
    const locationLongitudine=position.coords.longitude;
    const location=locationLatitude+","+locationLongitudine;
    resolve(location);
    });
});

function getWatherCurrentLocation(geocodeArr,temperature){
    const urlGeolocation="https://api.wunderground.com/api/4807759f8c2454f4/conditions/q/"+geocodeArr[0]+".json";
    
    fetch(urlGeolocation)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        // console.log(response);
        
         temperature.innerHTML='<div class="locationName">'+geocodeArr[1]+'</div>'+
                               '<p>'+response.current_observation.local_time_rfc822.substring(0,25)+'</p>'+
                               '<p>'+response.current_observation.weather+'</p>'+
                               '<div class="weatherinfo">'+
                               '<div class="imgandtemperature">'+
                               '<div class="weatherimg">'+
                               '<img src="'+response.current_observation.icon_url+'"</img>'+
                               '</div>'+
                               '<div class="grads">'+
                               '<div class="c">'+response.current_observation.temp_c+'</div>'+
                               '<div class="f">'+response.current_observation.temp_f+'</div>'+
                               '</div>'+
                               '<div class="typeofgrads cDeg" >&deg;C</div>'+'<div class="typeofgrads fDeg" >&deg;F</div>'+
                               '</div>'+
                               '<div class="otherInfo">'+
                               '<p> Humidity: '+response.current_observation.relative_humidity+'</p>'+
                               '<p> Pressure-mb: '+response.current_observation.pressure_mb+'</p>'+
                               '<a href="'+response.current_observation.history_url+'"target="_blank">More info</a>'+
                               '</div>'+
                               '</div>'
  
 //display weather in F degreeas

         $(".imgandtemperature").on("click",".fDeg",function(e){
              
              const degreasC=$($(this).parent().find(".c")["0"])
              const degreasF=$($(this).parent().find(".f")["0"])
              const degreasCsign=$($(this).parent().find(".cDeg")["0"])
              degreasF.addClass("fshow")
              degreasC.addClass("chide")
              $($(this)).addClass("fBlack")
              degreasCsign.addClass("cBlue")
         })
 //display weather in C degreeas

         $(".imgandtemperature").on("click",".cDeg",function(e){
          
            const degreasC=$($(this).parent().find(".c")["0"])
            const degreasF=$($(this).parent().find(".f")["0"])
            const degreasCsign=$($(this).parent().find(".fDeg")["0"])
            degreasF.removeClass("fshow")
            degreasC.removeClass("chide")
            $($(this)).removeClass("cBlue")
            degreasCsign.removeClass("fBlack")
       })

    
    })
         .catch(function(error){
            temperature.innerHTML='<div class="error">Sorry, something went wrong. Could you please try again</div>'
    })
}

function getWatherGoogleApi(googleApyArr,temperature){ 
    const urlGoogleLocation="https://api.wunderground.com/api/4807759f8c2454f4/geolookup/conditions/q/"+googleApyArr[0]+".json";

    fetch(urlGoogleLocation)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
         //console.log(response);
       
         temperature.innerHTML='<div class="locationName">'+googleApyArr[1]+'</div>'+
                               '<p>'+response.current_observation.local_time_rfc822.substring(0,25)+'</p>'+
                               '<p>'+response.current_observation.weather+'</p>'+
                               '<div class="weatherinfo">'+
                               '<div class="imgandtemperature">'+
                               '<div class="weatherimg">'+
                               '<img src="'+response.current_observation.icon_url+'"</img>'+
                               '</div>'+
                               '<div class="grads">'+
                               '<div class="c">'+response.current_observation.temp_c+'</div>'+
                               '<div class="f"> '+response.current_observation.temp_f+'</div>'+
                               '</div>'+
                               '<div class="typeofgrads cDeg" >&deg;C</div>'+'<div class="typeofgrads fDeg" >&deg;F</div>'+
                               '</div>'+
                               '<div class="otherInfo">'+
                               '<p> Humidity: '+response.current_observation.relative_humidity+'</p>'+
                               '<p> Pressure-mb: '+response.current_observation.pressure_mb+'</p>'+
                               '<a href="'+response.current_observation.history_url+'"target="_blank">More info</a>'+
                               '</div>'+
                               '</div>'
     
 //display weather in F degreeas

     $(".imgandtemperature").on("click",".fDeg",function(e){
        
        const degreasC=$($(this).parent().find(".c")["0"])
        const degreasF=$($(this).parent().find(".f")["0"])
        const degreasCsign=$($(this).parent().find(".cDeg")["0"])
        degreasF.addClass("fshow")
        degreasC.addClass("chide")
        $($(this)).addClass("fBlack")
        degreasCsign.addClass("cBlue")
   })
 //display weather in C degreeas

   $(".imgandtemperature").on("click",".cDeg",function(e){
    
      const degreasC=$($(this).parent().find(".c")["0"])
      const degreasF=$($(this).parent().find(".f")["0"])
      const degreasCsign=$($(this).parent().find(".fDeg")["0"])
      degreasF.removeClass("fshow")
      degreasC.removeClass("chide")
      $($(this)).removeClass("cBlue")
      degreasCsign.removeClass("fBlack")
 })

    })
         .catch(function(error){
            temperature.innerHTML='<div class="error">Sorry, something went wrong. We did not find such a locality. Could you please try again</div>'
           
         
    })
}

function getLocationGoogleAPI(){
    const countryEntered=$("#country").val();
    const regionEntered=$("#region").val();
    const locationEntered=$("#location").val()
    const url="https://maps.googleapis.com/maps/api/geocode/json?address="+countryEntered.trim()+"%20"+regionEntered.trim()+"%20"+locationEntered.trim()+"&key=AIzaSyDuTU9vbsDzaodkckSYVXaHQuf3LgPkw4o";
    return fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
         console.log(response);
         const locationGooleAPI=response.results["0"].geometry.location.lat.toFixed(7)+","+response.results["0"].geometry.location.lng.toFixed(7);
         const locationNameGoogle=response.results["0"].formatted_address;
         const googleApyArr=[locationGooleAPI,locationNameGoogle]
         return googleApyArr;
      
        
    })
         .catch(function(error){
          
          console.log("google api err ",error)
          return (error)
    })
}

function getNameFromGeolocation(location){
 urlName="https://maps.googleapis.com/maps/api/geocode/json?latlng="+location+"&key=AIzaSyDuTU9vbsDzaodkckSYVXaHQuf3LgPkw4o";
 return fetch(urlName)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        // console.log(response);
         let geocodeArr=[];
         for(var i=0; i<response.results.length; i++){
            const geolocation=response.results[i].geometry.location.lat+","+response.results[i].geometry.location.lng
             if(geolocation===location){
                  geocodeArr=[location,response.results[i].formatted_address]
            }else{
                  geocodeArr=[location,response.results[2].formatted_address]
                }
           
         }
         
         return geocodeArr
      
    })
         .catch(function(error){
          console.log('my error is: ', error);
    })
}


//this function does nothin, it was a propotype for my,i just want to keep it :)
function get(){
    const location= "47.1525049,28.4297664"
    "42.6977082,23.3218675" 
    urlName="https://maps.googleapis.com/maps/api/geocode/json?latlng="+location+"&key=AIzaSyDuTU9vbsDzaodkckSYVXaHQuf3LgPkw4o"
    return fetch(urlName)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
         console.log(response);
         console.log(response.results[1].formatted_address);
         console.log(response.results["1"].geometry.location)
         console.log(response.results)
         console.log(response.results.length)
        // console.log(response.results[1].geometry.location.lat+","+response.results[1].geometry.location.lng)
         for(var i=0; i<response.results.length; i++){
            const geolocation=response.results[i].geometry.location.lat+","+response.results[i].geometry.location.lng
             if(geolocation===location){
                 console.log("se potrivesc perfect "+ geolocation)
             }
            //console.log(response.results[i])
         }
        const n=response.results[2].formatted_address
        return n
    })
         .catch(function(error){
          console.log('my error is: ', error);
    })
}

//test function

function loader(loade){
    let i=0;
    let text="Loade";
    let speed=500;
    function writer(){
        if(i<text.length){
            loade.innerHTML+=text.charAt(i);
            i++
            setTimeout(writer, speed);
        }
       
    }
    writer()
    

   
}