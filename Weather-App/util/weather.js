import request from "request";

export function weather (longitude, latitude, callback) {
const access_key = '1f7f7a8068f240fa2f92e5a83a6db262';
const url = `https://api.weatherstack.com/current?access_key=${access_key}&query=` + latitude + ',' + longitude + `&units=m`;

    request({url, json: true }, (error, {body}) => {
    if(error) {
        callback('Unable to connect to weather service', undefined)
    } else if(body.error) {
        callback(body.error.info, undefined)
    } else {
        const temperature = body.current.temperature;
        const feelslikeTep = body.current.feelslike;
        const description = body.current.weather_descriptions[0];
        callback(undefined, `${description}. It currently ${temperature} degrees out. It feels like ${feelslikeTep} degrees out`)
    }
})

}


// 

// request({ url: url, json: true }, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to weather service')
//     } else if(response.body.error) {
//         console.log(response.body.error.info)
//     } else {
//         const temperature = response.body.current.temperature;
//         const feelslikeTep = response.body.current.feelslike;
//         const description = response.body.current.weather_descriptions[0];
//         console.log(`${description}. It currently ${temperature} degrees out. It feels like ${feelslikeTep} degrees out`)
//     }
    
    
// });
