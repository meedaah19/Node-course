import express from 'express';
import './db/mongoose.js';
import {router} from './routers/user.js'
import {routerTask } from './routers/task.js'

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//    res.status(503).send('This app is under maintainace, pls bare with us and come back later');
    
// })

app.use(express.json());
app.use(router);
app.use(routerTask );


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});