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
    description: '  Finish node js course   ',
    completed: false

})



export default Tasks;