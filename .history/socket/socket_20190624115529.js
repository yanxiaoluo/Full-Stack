const http = require('http')
const io = require('socket.io')

let httpServer = http.createServer()
httpServer.listen(2020)

let wsServer = io.listen(httpServer)
let asock = []
wsServer.on('connection', sock => {
    asock.push(sock)

    sock.on('disconnect', () => {
        let n = asock.indexOf(sock)
        if (n != -1) {
            asock.splice(n, 1)
        }
    })

    sock.on('msg', str => {
        asock.forEach(s => {
            if (s != sock) {
                s.emit('msg', str)
            }
        })
    })

    // setInterval(()=>{
    //     console.log(asock.length)
    // }, 1000)
})