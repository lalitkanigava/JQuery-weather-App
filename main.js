let key="d5d576ed6b31c2b1fc5c0dbc82a687c4";
let errorMsg="";
$(document).ready(function(){
    $("#content").hide();
    $("#errormsg").hide();
    $("#search").click(function(){
     let city= $("#input-search").val();
     
     if(city.length>0){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`,{method:"GET"})
        .then(data => data.json())
        .then(result => {
            console.log(result);
            if(result.cod == "200")
            {   
                
                $("#location").html(`  ${result.name}, ${result.sys.country} `);
                $("#cloudiness").html(`  ${result.clouds.all}% `);
                let min_temp=result.main.temp_min- 273.15;
                $("#mintemp").html(`  ${min_temp} °C `);
                let max_temp=result.main.temp_max- 273.15;
                $("#maxtemp").html(`  ${max_temp} °C `);
                $("#humidity").html(`  ${result.main.humidity}%  `);
                $("#windspeed").html(`  ${result.wind.speed} m/s  `);
                $("#errormsg").hide();
                $("#content").show();
               
            }
            if(result.cod == "404")
            {
                
                $("#content").hide();
                $("#errormsg").show();
                
            }
        $("#input-search").val("");
        });
     }
     else{
         
         console.log("Enter City Name");
     }
   
     
    });
  });