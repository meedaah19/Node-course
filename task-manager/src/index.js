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

// import Tasks from './models/task.js';
// import User from './models/user.js';

// const main = async () => {
//     // const task = await Tasks.findById('648b1f4f4f1a2565f4e2b6d3');
//     // await task.populate('owner');
//     // console.log(task.owner);
//     const user = await User.findById('6905075aebfb9fa1426b6eab');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }

// main();