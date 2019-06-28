const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url)
    console.log(pathname)

    fs.stat(`www/${pathname}`, (err, stat) => {
        if (err) {
            res.writeHead('404')
            res.write('not found')
            res.end()
        } else {
            if (req.headers['if-modified-since']) {
                console.log(req.headers['if-modified-since'])

                let oDate = new Date(req.headers['if-modified-since'])
                let client_time = Math.floor(oDate.getTime()/1000)
                let server_time = Math.floor(stat.mtime.getTime()/1000)

                console.log(server_time)
                console.log(client_time)

                if (server_time > client_time) {
                    sendFileToClient()
                } else {
                    res.writeHead(304)
                    res.write('not modified')
                    res.end()
                }
            } else {
                sendFileToClient()
            }

            function sendFileToClient () {
                let rs = fs.createReadStream(`www/${pathname}`)

                res.setHeader('last-modified', stat.mtime.toUTCString())

                rs.pipe(res)
            
                res.on('error', err => {
                    res.writeHead('404')
                    res.write('not found')
                    res.end()
                })
            }
        }
    })
}).listen(8080)