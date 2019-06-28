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
server.listen(1989)

server.use(multerObj.any())

server.use(cookieParser)
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


server.engine('html', consolidate.ejs)
server.set('views', 'template')
server.set('view engine', 'html')

// let r1 = express.Router();
// let r2 = express.Router();


//     r1.get('/1.html', function (req, res) {
//         res.send('我是文章1').end()
//     });
//     r1.get('/2.html', function (req, res) {
//         res.send('我是文章2').end()
//     });
//     server.use('/art/', r1);

let userrouter = express.Router()
server.use('/user', userrouter)

server.get('/1.html', (req, res) => {
    res.send('user1')
})
userrouter.get('/2.html', (req, res) => {
    res.send('user2')
})


// server.use('/blog/', r2);
//     r2.get('/a.html', function (req, res) {
//         res.send('我是文章1').end()
//     })
//     r2.get('/b.html', function (req, res) {
//         res.send('我是文章2').end()
//     })


// server.use(static('./www'))
