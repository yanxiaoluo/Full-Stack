const express = require('express')
const body = require('body-parser')
const multer = require('multer')
const static = require('express-static')

let server = express()

server.listen(2020)

server.use(body.urlencoded({ extended: false }))
let multerobj = multer({ dest: './www/upload/' })
server.use(multerobj.any())

//服务器必须能处理options
server.use('/api', (req, res) => {
    console.log(req.headers['origin'])
    if (req.headers['origin'] == 'null' || req.headers['origin'].startsWith('http://localhost')) {
        res.setHeader('Access-Control-Allow-Origin', '*')
    }
    console.log(req.body)
    console.log(req.files)
    res.send('ok')
})

server.use(static('./www'))