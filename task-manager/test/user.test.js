import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.js'
import { userOne, userOneId, setupDatabase } from './fixtures/db.js';

beforeEach(setupDatabase)

test('Should signup a new user', async ()=>{
    const response = await request(app).post('/users').send({
        name: 'Hameedat',
        email: 'hameedat@gmail.com',
        password: '11111111'
    }).expect(201)

    //Assert that the database was chnaged correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name:'Hameedat',
            email: 'hameedat@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user)
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200) 

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token);

})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'dorcas',
        password:'hanamdhn@gmail.com'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')   
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')   
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/delete')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/delete')
    .send()
    .expect(401)
})

test('should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/1_Depositoo.png')
    .expect(200)
    // const user = await User.findById(userOneId)
    // .expect(user.avatars).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
    const response = await request(app)
    .patch('/users/update')
    .send({
        name: 'Meedah',
    })
    .expect(200)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Meedah')

    expect(response.body).not.toMatchObject({
        user: {
            name:'Hameedat',
        },
        token: user.tokens[0].token
    })
    expect(user)
});

test('should not update invalid user fields', async () => {
     await request(app)
    .patch('/users/update')
    .send({
        location: 'Ilorin'
    })
    .expect(400)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
})

