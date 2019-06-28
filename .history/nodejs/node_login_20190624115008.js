const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')

let users = {}

let server = http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true)
    console.log(pathname, query)

    let str = ''
    req.on('data', data => {str += data})
    req.on('end', () => {
        let post = querystring.parse(str)
        console.log(post)
        let {user, pass} = query

        switch(pathname){
            case '/reg':
                if (!user) {
                    res.write('{ "err": 1, "msg": "user is required" }')
                } else if (!pass) {
                    res.write('{ "err": 1, "msg": "pass is required" }')
                } else if (!/^\w{5,32}$/.test(user)) {
                    res.write('{ "err": 1, "msg": "invaild name" }')
                } else if (/['|"]$/.test(pass)) {
                    res.write('{ "err": 1, "msg": "invaild pass" }')
                } else if (users[user]) {
                    res.write('{ "err": 1, "msg": "user is exist" }')
                } else {
                    users[user] = pass
                    res.write('{ "err": 0, "msg": "success" }')
                }
                res.end()
                break;
            case '/login':
                if (!user) {
                    res.write('{ "err": 1, "msg": "user is required" }')
                } else if (!pass) {
                    res.write('{ "err": 1, "msg": "pass is required" }')
                } else if (!/^\w{5,32}$/.test(user)) {
                    res.write('{ "err": 1, "msg": "invaild name" }')
                } else if (/^['|']$/.test(pass)) {
                    res.write('{ "err": 1, "msg": "invaild pass" }')
                } else if (!users[user]) {
                    res.write('{ "err": 1, "msg": "no this user" }')
                } else if (users[user] != pass) {                    
                    res.write('{ "err": 0, "msg": "username or pass is incorrect" }')
                } else {
                    res.write('{ "err": 0, "msg": "login success" }')
                }
                res.end()
                break;
            default:
                fs.readFile(`www${pathname}`, (err, data) => {
                    if (err) {
                        res.writeHead('404')
                        res.write('not found')
                    } else {
                        res.write(data)
                    }
                    res.end()
                })
        }
    })
})

server.listen(8080)