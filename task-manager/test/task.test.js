import request from 'supertest';
import app from '../src/app.js';
import Tasks from '../src/models/task';
import { userOne, userOneId, userTwoId, userTwo, taskOne, taskTwo, taskThree, setupDatabase } 
from './fixtures/db.js';

beforeEach(setupDatabase)

test('Should create task for user', async() => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From my test'
    })
    .expect(200)
    const task = await Tasks.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should expect all task from userOne', async() => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Task delete task security', async() => {
    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Tasks.findById(taskOne._id)
    expect(task).not.toBeNull()
})
