const http = require('http')
const url = require('url')
const fs = require('fs')
const buf = require('./libs/buf')
const uuid = require('uuid/v4')

let server = http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true)

    let arr = []
    req.on('data', data => {
        arr.push(data)
    })
    req.on('end', () => {
        let data = Buffer.concat(arr)
        let post = {}
        let files = {}
        
        if (req.headers['content-type']) {
            let str =  req.headers['content-type'].split(';')[1]
            if (str) {
                let boundary = '--' + str.split('=')[1]

                let arr = data.split(boundary)
                arr.shift()
                arr.pop()
                arr = arr.map(item=>item.slice(2, item.length-2))

                arr.forEach(ele => {
                    let n = ele.indexOf('\r\n\r\n')

                    let diposi = ele.slice(0, n)
                    let content = ele.slice(n+4)

                    diposi = diposi.toString()

                    if (diposi.indexOf('\r\n') == -1) {
                        console.log('text')
                        content = content.toString()
                        let name = diposi.split(';')[1].split('=')[1]
                        name = name.substring(1, name.length-1)

                        post[name] = content
                    } else {
                        console.log('file')
                        let [line1, line2] = diposi.split('\r\n')
                        let [, name, filename] = line1.split('; ')
                        
                        console.log(diposi)
                        let type = line2.split(': ')[1]

                        name = name.split('=')[1]
                        name = name.substring(1, name.length-1)

                        filename = filename.split('=')[1]
                        filename = filename.substring(1, filename.length-1)

                        console.log(name, filename, type)

                        let path = `www/upload/${uuid().replace(/\-/g, '')}`

                        fs.writeFile(path, content, err => {
                            if (err) {
                                console.log('file failed')
                            } else {
                                files[name] = { filename, path, type }
                                console.log('file success')
                                console.log(files)
                            }
                        })
                    }
                });
                console.log(post)
            }
        }
        res.end()
    })
})

server.listen(8080)