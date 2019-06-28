const express = require('express');

let server = express()

server.listen(2023)

//子服务
let userrouter = express.Router()
server.use('/user', userrouter)

userrouter.get('/1.html', (req, res) => {
    res.send('user1')
})
userrouter.get('/2.html', (req, res) => {
    res.send('user2')
})

let artrouter = express.Router()
server.use('/art', artrouter)
artrouter.get('/3.html', (req, res) => {
    res.send('art1')
})
artrouter.get('/4.html', (req, res) => {
    res.send('art2')
})