import Tasks from '../models/task.js';
import express from 'express';
import auth from '../middlewares/auth.js';

const routerTask = new express.Router()

routerTask.post('/tasks', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id 
    })

    try {
        await task.save();
        res.status(200).send(task);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});



routerTask.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
       await req.user.populate({
        path: 'tasks',
        match,
        options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        }
       });
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error)
    }
})

routerTask.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
         const task = await Tasks.findOne({ _id, owner: req.user._id })

        if(!task) {
        return res.status(404).send()
       }
         res.status(200).send(task)
    } catch (error) {
        res.status(500).send 
    }
});

routerTask.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['decription', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(404).send(error)
    }
})



routerTask.delete('/tasks/delete/:id', auth, async(req, res) => {
    try {
        const task = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id});

        if(!task) {
            return res.status(404).send()
        }

        res.send(task);
    } catch (error) {
        res.status(500).send()
    }
})


export {routerTask };