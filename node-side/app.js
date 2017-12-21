const express=require('express');
const bodyParser = require('body-parser');
const {mongoose} = require ('./db/mongoose');
const {getOrders} =require('./routes/getOrders');
const {getOrderDetails} =require('./routes/getOrderDetails');
const {login}=require('./routes/login');
const {signup}=require('./routes/signup');
const {authenticate}=require('./middlewares/authenticate');
const {addOrder}=require('./routes/addOrder');
const {deleteOrder}=require('./routes/deleteOrder');
const {updateOrder}=require('./routes/updateOrder');
const {getIngredients}=require('./routes/getIngredients');


const app=express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, x-auth');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/',(req,res,next) => {
    console.log('In app.use');
    next();
});

app.post('/order',authenticate,addOrder);
app.get('/orders',authenticate,getOrders);
app.get('/order-details/:id',authenticate,getOrderDetails);
app.delete('/order/:id',authenticate,deleteOrder);
app.put('/order/:id',authenticate,updateOrder);
app.get('/ingredients',getIngredients);
app.post('/login',login);
app.post('/signup',signup);

app.listen(3001);