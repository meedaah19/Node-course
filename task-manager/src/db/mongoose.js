import mongoose from "mongoose";
import validator from 'validator';

mongoose.connect("mongodb://127.0.0.1:27017/task-manager").then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((error) => {
  console.log(" Connection error:", error);
});

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

try {
    task.save()
    console.log(task)
} catch (error) {
    console.log('error', error)
}

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         require: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         require: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         require: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if(value.toLowerCase().includes('password')) {
//                 throw new Error('Password cannot contain "password"')
//             }
//         },

//     }
// })


// const  me = new User({
//     name: '   Hameedat',
//     email: 'HAMEEDAT@mgg.Io',
//     password: '  pass12333  '
// })

// me.save().then(() =>{
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })