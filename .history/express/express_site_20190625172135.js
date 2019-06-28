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

server.use(multerObj.any())

server.use(cookieParser())
// (function () {
//     var keys = []
//     for (var i = 0; i < 100000; i++) {
//         keys[i] = 'a_'+Math.random()
//     }
//     server.use(cookieSession({
//         name: 'sess_id',
//         keys: keys,
//         maxAge: 20*60*1000
//     }));
// })();


server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

server.use('/', require('./route/web'));
server.use('/art/', require('./route/admin'));
    


server.use(static('./www'))
