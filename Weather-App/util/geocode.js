import request from 'request';

const geocoding = (address,  callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVlZGFhaCIsImEiOiJjbWdwM2ZleXUwcGM1MmpzOXM4MXc4anFoIn0.FjJW4v3XtNQC_rR5p2By4A'

    request({url, json:true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect to service', undefined)
        }else if(body.features.length === 0){
            callback('Please provide a location', undefined)
        } else {
            callback(undefined, {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export {geocoding};
