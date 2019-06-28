const express = require('express');
const expressRoute = require('express-route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const multerObj = multer({dest: '../www/upload'});
const mysql = require('mysql');
const consolidate = require('consolidate');
const static = require('express-static');

let server = express()
server.listen(2020)

server.use(bodyParser())
server.use(multerObj.any())

server.use(cookieParser());
(function () {
    let arr = []
    for (let i = 0; i < 100000; i++) {
        arr.push('keys_' + Math.random())
    }
    server.use(cookieSession({name: 'zng_se_id', keys: arr, maxAge: 20*60*1000}))
})()


server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

server.use('/', require('./route/web'));
server.use('/admin/', require('./route/admin'));
    


server.use(static('./www'))
