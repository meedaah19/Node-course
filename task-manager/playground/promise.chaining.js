import '../src/db/mongoose.js';
import Tasks from '../src/models/task.js';

// Tasks.findByIdAndDelete('68f761524f46e9ac71ed4fa1').then((task) => {
//     console.log('Deleted succesfully', task)
//     return Tasks.find({completed: true})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskAndCount = async (id) => {
    const tasks = await Tasks.findByIdAndDelete(id);
    const count = await Tasks.countDocuments({completed: true});
     console.log(tasks)
    return count;
   
}

deleteTaskAndCount('68f8a89c5523fdcf5d819bd3').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log('e', e)
})