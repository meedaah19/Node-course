import mongoose from "mongoose";


const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Tasks({
    description: '  Learn Mongoose   ',
    completed: true

})


export default Tasks;