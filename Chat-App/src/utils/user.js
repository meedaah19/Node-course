const users = []


const addUser = ({ id, username, room }) => {
    username = username ? username.trim().toLowerCase() : ""
    room = room ? room.trim().toLowerCase() : ""

    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    const user = { id, username, room }
    users.push(user)
    return { user }
}
// const removeUser = (id) => {
//     const index = user.findIdex((user) => user.id ==id)

//     if(index)
// }

addUser({
    id: 22,
    username: 'Hameedat',
    room: 'South Philly'
})
console.log(users)

const res = addUser({
    id: 12,
    username: 'hameedat',
    room: 'South Philly'
})

console.log(res)



