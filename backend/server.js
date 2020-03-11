'use strict'
const express = require('express');
const authRoutes = require('./auth/auth.routes');
const properties = require('./config/properties');
const DB = require('./config/db');

//init DB

DB();

const app = express();
const router = express.Router();

app.use('/api',router);
authRoutes(router);

router.get('/', (req,res)=>{
res.send('hello from home');
});

app.use(router);

app.listen(properties.PORT, ()=> console.log(`Server runing on ${properties.PORT}`));


