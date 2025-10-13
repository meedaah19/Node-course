import {geocoding} from './util/geocode.js';
import {weather} from './util/weather.js';

const address = process.argv[2];

if(!address) {
    console.log('Please provide a location')
}else {
    geocoding(address, (error, {lat, long, location}) =>{
    if(error) {
        return console.log(error)
    }
    
    weather(lat, long, (error, weatherData) => {
        if(error){
            return console.log(error);
        }
    console.log(location);
    console.log(weatherData);
})
    
}
)}