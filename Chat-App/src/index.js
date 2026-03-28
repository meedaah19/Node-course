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

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('CountUpdated', count)
});


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})