import express from 'express';
import './db/mongoose.js';
import User from './models/user.js';
import Tasks from './models/task.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);   
    }
});

app.get('/users', async (req, res) => {
    try {
       const user =  await User.find({})
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
       const user = await User.findById(_id)
       if(!user) {
        return res.status(404).send()
       }
       res.status(201).send(user)
    } catch (error) {
        res.send(500).send(error)
    }
})

app.post('/tasks', async (req, res) => {
    const user = new Tasks(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async (req, res) => {
    try {
       const task =  await Tasks.find({})
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id   
    try {
       const task = await Tasks.findById(_id)
       if(!task) {
        return res.status(404).send()
       }
         res.status(201).send(task)
    } catch (error) {
        res.status(500).send
    }
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});