import express from 'express';
import './db/mongoose.js';
import {router} from './routers/user.js'
import {routerTask } from './routers/task.js'

const app = express();


app.use(express.json());
app.use(router);
app.use(routerTask );

export default app;