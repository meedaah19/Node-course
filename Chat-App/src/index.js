import express from "express";
import path from "path";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname} from 'node:path';
import { Server } from "socket.io";


const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../public')));

// let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit("message", "Welcome")

    socket.on('message-form', (msg) => {
        io.emit('message', msg)
    })

});


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


    //     // this emit event to that specific connection
    //     //socket.emit('CountUpdated', count)

    //     // this emit event to every single connection
    //     io.emit('CountUpdated', count)
