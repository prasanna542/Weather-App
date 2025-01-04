document.addEventListener('DOMContentLoaded',()=>{
    //First we capture all the elements here.
    const city_input = document.getElementById('city_input');
    const get_weather_btn = document.getElementById('get_weather');
    const weather_info = document.getElementById('weather_info');
    const cityname = document.getElementById('cityname');
    const temp = document.getElementById('temp');
    const extra_info = document.getElementById('extra_info');
    const err_msg = document.getElementById('error_msg');

    const API_KEY = "1dd50c33a517ce0ad6b7acfc2d3708e1"; //later we will store such keys in env variables. 

    err_msg.classList.add('hidden');
    weather_info.classList.add('hidden');

    get_weather_btn.addEventListener("click", async ()=>{
        err_msg.classList.add('hidden');
        weather_info.classList.add('hidden');
        let input_c = city_input.value.trim();
        if(!input_c){
            alert("please enter a valid city name");
            return;    //here empty string is considered as the false value in javascript.
        }
        else{
            try {
                let weatherData = await getWeatherData(input_c);
                displayWeatherData(weatherData);
            } catch (error) {
                showError();
            }

            
        }
    });


    async function getWeatherData(cityName){
        // const url = `https://api.openweathermap.org/data/2.5/onecall?q=${cityName}&appid=${API_KEY}`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        console.log(typeof response);
        console.log(response);

        if(response.ok){
            let data = await response.json();
            console.log(data);
            
            return data;
        }
        else{
            // alert("Oops! Something went wrong.");
            
            err_msg.classList.remove("hidden");
            return;
        }
        
    }

    function displayWeatherData(weather_data){
        const name = weather_data.name;
        const temp2 = weather_data.main.temp;
        
        cityname.textContent = name;
        temp.textContent = temp2;
        weather_info.classList.remove('hidden');

    }



    

});