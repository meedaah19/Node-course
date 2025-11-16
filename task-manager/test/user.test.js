import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { response } from 'express';

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

beforeEach( async () => {
    await User.deleteMany();
    await new User(userOne).save()
})

test('Should signup a new user', async ()=>{
    await request(app).post('/users').send({
        name: 'Hameedat',
        email: 'hameedat@gmail.com',
        password: '11111111'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expec(user).not.toBeNull()

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
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200) 
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
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/delete')
    .send()
    .expect(401)
})