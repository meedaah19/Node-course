import express from "express";
import path from "path";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname} from 'node:path';
import { Server } from "socket.io";
import {Filter} from 'bad-words';
import {generateMessage, generateLocationMessage} from './utils/messages.js'
import {addUser, getUser, getUserInRoom, removeUser} from './utils/user.js'

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', (options, callback) => {
        const {error, user} = addUser({id: socket.id, ...options})

        if(error) {
            return callback(error)
        }

        socket.join(user.room)

        //use for only the one person
        socket.emit("message", generateMessage(`welcome Admin` ))

        //use for everyone except the new user
        socket.broadcast.to(user.room).emit("message", generateMessage(`Admin ${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInRoom(user.room)
        })

        callback()

    })

    socket.on('message-form', (msg, callback) => {
        const user = getUser(socket.id)
        const filterWord = new Filter()

        if(filterWord.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }

        //use for everyone
        io.to(user.room).emit('message', generateMessage(user.username, msg))
        callback()

    })

    socket.on('SendLocation', (location, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${location.latitude},${location.longitude}`) )
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) {
           io.to(user.room).emit('message', generateMessage(`Admin ${user.username} has left`))
           io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInRoom(user.room)     
        })
        }
    })

});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


    //     // this emit event to that specific connection
    //     //socket.emit('CountUpdated', count)

    //     // this emit event to every single connection
    //     io.emit('CountUpdated', count)
