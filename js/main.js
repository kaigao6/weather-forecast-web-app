document.addEventListener("DOMContentLoaded", function(){
   
    serverData.getJSON();   
});

 let serverData = {
    url: "https://gao00078.edumedia.ca/mad9014/weather/forecast.php",
    httpRequest: "GET",
    getJSON: function () {
        
        let headers = new Headers();
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        // simply show them in the console
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
        
        let options = {
            method: serverData.httpRequest,
            mode: "cors",
            headers: headers
        };
        
        //like package
        let request = new Request(serverData.url, options);
        console.log(request);
        
        fetch(request)
            .then(function (response) {

                console.log(response);
                
                return response.json();
            })
            .then(function (data) {
                console.log(data); // now we have JS data, let's display it
                //call a function to handle your data
            displayHourlyData(data.hourly.data);

            })
            .catch(function (err) {
                alert("Error: " + err.message);
            });
    }
};

function displayHourlyData( data ){
    console.log("line48 " + data);
    
    if(data.length == 0){
        return;
    }
    
    //easy to fixe in this way
    const numberOfHoursToDisplay = 24; 
    
    let numberOfHours = null;
    
    if(data.length >= numberOfHoursToDisplay){
        numberOfHours = numberOfHoursToDisplay;
//        console.log(numberOfHoursToDisplay);
    } else{
        numberOfHours = data.length;
    }
    
    let weatherForecastDiv = document.querySelector(".weather-forecast");
    
    
    let time = new Date();
    
    let today = time.getDay();
    
    console.log("THE DAY: " + time.getDay());
    



    for (let i = 0; i < numberOfHours; i++){
        console.log("here1: " + data[i].time);
        //convert from seconds to millisecondes
        
        time.setTime(data[i].time * 1000);
        //time.setTime(data[i].time );
        console.log("here2: "+time);
        console.log(data[i].temperature);
        console.log(data[i].icon);
        
        let div = document.createElement("div");
        
        
               /* changing starts*/
        let divHourTime = document.createElement("p");
        divHourTime.classList.add("col");
        divHourTime.classList.add("hourlyTime");
        
        
        let varTime = time.getHours();
        let varTimeStr = "";
        if(varTime == 0){
            varTimeStr = "12AM";
        } else if( varTime >= 1 && varTime <= 11){
            varTimeStr = varTime.toString() + "AM";
        } else if(varTime == 12){
            varTimeStr = "12PM";
        } else{
            varTimeStr = (varTime - 12).toString() + "PM";
        }
        
        let temParag = document.createTextNode(varTimeStr);
        divHourTime.appendChild(temParag);
        div.appendChild(divHourTime);
        
        
            
        let divHourTemperature = document.createElement("p");
        divHourTemperature.classList.add("col");
        divHourTemperature.classList.add("hourlyTemperature");
        let temTemper = document.createTextNode(Math.round(data[i].temperature) + "℃");
        divHourTemperature.appendChild(temTemper);
        div.appendChild(divHourTemperature);
        /* changing ends*/
        
        
        
        
        let iTag = document.createElement("i");
        iTag.classList.add("wi");
        iTag.classList.add("col");
        //adding another class name in iTag
      /*  changing starts*/

    let temIcon = data[i].icon;
     switch(temIcon){
        case "clear-day":
            temIcon = "forecast-io-clear-day";
            break; 
        case "clear-night":
            temIcon = "forecast-io-clear-night";
            break;
        case "rain":
            temIcon = "forecast-io-rain";
            break;
        case "snow":
            temIcon = "forecast-io-snow";
            break;
        case "sleet":
            temIcon = "forecast-io-sleet";
            break; 
        case "wind":
            temIcon = "forecast-io-wind";
            break; 
        case "fog":
            temIcon =  "forecast-io-fog";
            break;      
         case "cloudy":
            temIcon =  "forecast-io-cloudy";
            break;     
         case "partly-cloudy-day":
            temIcon =  "forecast-io-partly-cloudy-day";
            break;      
         case "partly-cloudy-night":
            temIcon = "forecast-io-partly-cloudy-night";
            break;
            
        default:
            console.log("Not sure what happened");
            break;
            
    }
        
        
        
      /*  changing ends*/

        iTag.classList.add("wi-" + temIcon);
        
        div.appendChild(iTag);
        

        div.classList.add("divEachHour");
        div.classList.add(temIcon);
        
        weatherForecastDiv.appendChild(div);
       
        
    }
}











    
//    let myVar = 0;
//    today = 5;
//    
//    switch(today){
//        case 0:
//            console.log("Sunday");
//            break; 
//        case 1:
//            console.log("Monday");
//            break;
//        case 2:
//            console.log("Tuesday");
//            break;
//        case 3:
//            console.log("Wednesday");
//            break;
//        case 4:
//            console.log("Thursday");
//            break; 
//        case 5:
//            console.log("Friday");
//            break; 
//        case 6:
//            console.log("Saturday");
//            break;
//            
//        default:
//            console.log("Not sure what happened");
//            break;
//            
//    }
// let icon = document.querySelector(".wi");
//    switch(icon){
//        case "clear-day":
//            icon = "-wi-day-sunny";
//            break;
//        case "clear-night":
//            icon = " "
//            break;

//            
//    }
//    console.log(icon)
//    
//    console.log(time);









