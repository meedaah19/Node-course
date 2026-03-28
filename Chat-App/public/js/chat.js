const socket = io();

socket.on('CountUpdated', (count) => {
    console.log('The count has been updated!', count)
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('clicked')

    socket.emit('CountUpdated', count)

    socket.on('increment', () => {
        count++
        socket.emit('CountUpdated', count)
    })
})