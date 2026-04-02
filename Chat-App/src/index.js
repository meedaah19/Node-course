import express from "express";
import path from "path";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname} from 'node:path';
import { Server } from "socket.io";
import {Filter} from 'bad-words';
import {generateMessage, generateLocationMessage} from './utils/messages.js'

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', ({username, room}) => {
        socket.join(room)

        //use for only the one person
        socket.emit("message", generateMessage('Welcome!'))

        //use for everyone except the new user
        socket.broadcast.to(room).emit("message", generateMessage(`${username} has joined!`))

    })

    socket.on('message-form', (msg, callback) => {
        const filterWord = new Filter()

        if(filterWord.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }

        //use for everyone
        io.emit('message', generateMessage(msg))
        callback()

    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage("A user has left"))
    })

    socket.on('SendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`) )
        callback()
    })

});


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


    //     // this emit event to that specific connection
    //     //socket.emit('CountUpdated', count)

    //     // this emit event to every single connection
    //     io.emit('CountUpdated', count)
