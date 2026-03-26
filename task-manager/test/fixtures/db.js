import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import User from "../../src/models/user";
import Tasks from "../../src/models/task";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'hameedat',
    email: 'hameedattt@gmail.com',
    password: 'bbdg56fffffff',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Abike',
    email: 'Abike@gmail.com',
    password: 'yyyyyyyyyyyf',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: false,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Tasks.deleteMany();
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Tasks(taskOne).save()
    await new Tasks(taskTwo).save()
    await new Tasks(taskThree).save()

}

export {userOneId, userOne, userTwo, userTwoId, taskOne, taskThree, taskTwo, setupDatabase}