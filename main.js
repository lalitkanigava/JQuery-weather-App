let key="d5d576ed6b31c2b1fc5c0dbc82a687c4";
let errorMsg="";

function utsTimeConverter(time)
{
                var date = new Date(time * 1000);
                // Hours part from the timestamp
                var hours = date.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();
                // Will display time in 10:30:23 format
                
                var formattedTime =` ${hours} : ${minutes.substr(-2)} :  ${seconds.substr(-2)}`;
                return formattedTime;
}
function displayData()
{
    let city= $("#input-search").val();
   
    if(city.length>0){
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`,{method:"GET"})
        .then(data => data.json()) 
        .then(result => {
            console.log(result);
            if(result.cod == "200")
            {   
                console.log(result.weather[0].main);
                if(result.weather[0].main == "Clouds"){
                    let imageUrl="img/Clouds.jpg";
                    $("body").css("background-image", "url(" + imageUrl + ")");
                }
                else if(result.weather[0].main == "Haze"){
                    let imageUrl="img/Haze.jpg";
                    $("body").css("background-image", "url(" + imageUrl + ")");
                }
                else if(result.weather[0].main == "Drizzle"){
                    let imageUrl="img/Drizzle.jpg";
                    $("body").css("background-image", "url(" + imageUrl + ")");
                }
                else if(result.weather[0].main == "Rain"){
                    let imageUrl="img/Rain.jpg";
                    $("body").css("background-image", "url(" + imageUrl + ")");
                }
                else if(result.weather[0].main == "Snow"){
                    let imageUrl="img/Snow.jpg";
                    $("body").css("background-image", "url(" + imageUrl + ")");
                }
                else if(result.weather[0].main == "Thunderstrom"){
                    let imageUrl="img/thunderstrom.jpg";
                    $("body").css("background-image", "url(" + imageUrl + ")");
                }

                $("#location").html(`  ${result.name}, ${result.sys.country} `);
                $("#cloudiness").html(`  ${result.clouds.all}% `);
                let min_temp=result.main.temp_min- 273.15;
                $("#mintemp").html(`  ${min_temp.toFixed(2)} °C `);
                let max_temp=result.main.temp_max- 273.15;
                $("#maxtemp").html(`  ${max_temp.toFixed(2)} °C `);
                $("#humidity").html(`  ${result.main.humidity}%  `);
                $("#windspeed").html(`  ${result.wind.speed} m/s  `);
                let sunset=utsTimeConverter(result.sys.sunset);
                $("#sunset").html(`  ${sunset} `);
                let sunrise=utsTimeConverter(result.sys.sunrise);
                $("#sunrise").html(`  ${sunrise} `);
                $("#errormsg").hide();
                $("#content").show();
               
            }

            if(result.cod == "404")
            {
                
                $("#content").hide();
                errorMsg = "Please enter valid or nearby city..."
                $("#errcontent").html(errorMsg);
                $("#errormsg").show();
            
            }

        $("#input-search").val("");
        }).catch(err=>{

            if(err == "TypeError: Failed to fetch")
            {
                errorMsg="Please check Your Internet connection";
                $("#errcontent").html(errorMsg);
                $("#errormsg").show();   
            }
        });
     }
     else{
         
         errorMsg = "Please enter city..."
         $("#errcontent").html(errorMsg);
         $("#errormsg").show();

     }
}
$(document).ready(function(){
    
    $("#content").hide();
    $("#errormsg").hide();
    $("#input-search").keyup(function(event){
        $("#errormsg").hide();
    });
    $("#input-search").keypress(function(event){
        if(event.which==13){
            displayData(); 
           event.preventDefault();
        }
     });
    $("#search").click(function(){ 
    displayData(); 
    });

  });