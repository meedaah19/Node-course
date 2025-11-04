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
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const task = new Tasks({
    description: '  Finish node js course   ',
    completed: false 

})



export default Tasks; 