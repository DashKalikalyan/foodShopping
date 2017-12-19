const express=require('express');
const bodyParser = require('body-parser');
const {mongoose} = require ('./db/mongoose');
const {getOrders} =require('./routes/getOrders');
const {getOrderDetails} =require('./routes/getOrderDetails');
const {login}=require('./routes/login');
const {signup}=require('./routes/signup');
const {authenticate}=require('./middlewares/authenticate');
const {addOrder}=require('./routes/addOrder');


const app=express();
app.use(bodyParser.json());

app.use('/',(req,res,next) => {
    console.log('In app.use');
    next();
});

app.post('/order',authenticate,addOrder);
app.get('/orders',authenticate,getOrders);
app.get('/order-details/:id',authenticate,getOrderDetails);
app.post('/login',login);
app.post('/signup',signup);

app.listen(3001);