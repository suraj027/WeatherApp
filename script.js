const time1 = document.getElementById("time");
const date1 = document.getElementById("date");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
setInterval(() =>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hr12f = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ap = hour >=12 ? 'PM' : 'AM'
    time1.innerText = hr12f + ':' + minutes + ' ' + ap;

    date1.innerText = days[day] + ' ,' + date + ' ' + months[month]
}, 1000);





let weather = {
    "apiKey": "62e0e9462ae34bef4d3f6bf020194830",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid=62e0e9462ae34bef4d3f6bf020194830"
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src ="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/"+ icon + ".svg";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
         document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ description+"')";


    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    
};
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});
