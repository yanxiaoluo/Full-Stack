const express = require('express');
const expressRoute = require('express-route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionCookie = require('cookie-session');
const multer = require('multer');
const multerObj = multer({dest: '../www/upload'});
const mysql = require('mysql');
const consolidate = require('consolidate');
const static = require('express-static');

let server = express()
server.listen(7070)

server.use(multerObj.any())

server.use(cookieParser)
(function () {
    let keys = []
    for (let i = 0; i < 10000; i++) {
        keys[i] = 'a_'+Math.random()
    }
    server.use(sessionCookie({
        name: 'sess_id',
        keys,
        maxAge: 20*60*1000
    }))
})()


server.use(static('../www'))