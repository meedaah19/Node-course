import Tasks from '../models/user.js';
import express from 'express';

const routerTask = new express.Router()

routerTask.post('/tasks', async (req, res) => {
    const user = new Tasks(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});



routerTask.get('/tasks', async (req, res) => {
    try {
       const task =  await Tasks.find({})
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

routerTask.get('/tasks/:id', async (req, res) => {
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
});

routerTask.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['decription', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Tasks.findById(req.params.id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()

       // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(404).send(error)
    }
})



routerTask.delete('task/:id', async(req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id);

        if(!task) {
            return res.status(404).send()
        }

        res.send(task);
    } catch (error) {
        res.status(500).send()
    }
})


export {routerTask };