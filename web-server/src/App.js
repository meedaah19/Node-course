import express from 'express';
import path from 'path';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import { geocoding } from './util/geocode.js';
import { weather } from './util/weather.js';
 
const app = express(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views')); 
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (req, res) => {
    
    res.render('index', {
        title: 'Weather App',
        name: 'Hameedat Timileyin'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Hameedat',
        name: 'Hameedat Timileyin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help message',
        message: 'Click  this link to get help',
        name: 'Hameedat Timileyin'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    } 
        geocoding(req.query.address, (error, {lat, long, location} = {}) =>{
    if(error) {
        return res.send({error})
    }
   

        weather(lat, long, (error, weatherData) => {
            if(error){
                return res.send({error});
            }
        res.send({
        forecast: weatherData, 
        location,
        address: req.query.address
        },
        )
    })
     })
})


app.get(/^\/help(\/.*)?$/, (req, res) => {
  res.render('404', {
    title: 'Helper page not available',
     name: 'Hameedat Timileyin'

  });
});

app.get(/.*/, (req, res) => {
  res.render('404', {
    title: '404 page not found',
   name: 'Hameedat Timileyin'

  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})