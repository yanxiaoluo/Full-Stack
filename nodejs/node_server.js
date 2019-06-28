const http = require('http')
const fs = require('fs')
const urlZlib = require('url')
const mysql = require('mysql')
const zlib = require('zlib')
const crypto = require('crypto')

const _key = 'sdbiuhbrwohjgiohjrwiuhbnoqejfpdj$qwfihjwuge.jmnsiawgntswa;igjvisjgwnkwegjno;gtjijfw'

function md5 (str) {
    let obj = crypto.createHash('md5')
    obj.update(str)
    return obj.digest('hex')
}

function md5_2 (str) {
    return md5(md5(str)+_key)
}

const db = mysql.createPool({ host: 'cvm.idevent.cc', port: '3306', user: 'root', password: 'haijiao920815', database: '20190505' })

http.createServer((req, res) => {
    let { pathname, query } = urlZlib.parse(req.url, true)
    let { user, pass } = query
    console.log(pathname, query)

    switch (pathname) {
        case '/reg':
            if (!user) {
                res.write('{ "err": 1, "msg": "user is required" }')
                res.end()
            } else if (!pass) {
                res.write('{ "err": 1, "msg": "password is required" }')
                res.end()
            } else if (!/^\w{4,16}$/.test(user)) {
                res.write('{ "err": 1, "msg": "invaild name" }')
                res.end()
            } else if (/['|"]$/.test(pass)) {
                res.write('{ "err": 1, "msg": "invaild password" }')
                res.end()
            } else {
                db.query(`SELECT * FROM user_table WHERE username='${user}'`, (err, data) => {
                    if (err) {
                        res.write('{ "err": 1, "msg": "database error" }')
                        res.end()
                    } else if (data.length > 0) {
                        res.write('{ "err": 1, "msg": "this username exists" }')
                        res.end()
                    } else {
                        db.query(`INSERT INTO user_table (ID, username, password) VALUES(0, '${user}', '${md5_2(pass)}')`, (err, data) => {
                            if (err) {
                                res.write('{ "err": 1, "msg": "database error" }')
                                res.end()
                            } else {
                                res.write('{ "err": 0, "msg": "success" }')
                                res.end()
                            }
                        })
                    }
                })
            }
            break;
        case '/login':
        if (!user) {
            res.write('{ "err": 1, "msg": "user is required" }')
            res.end()
        } else if (!pass) {
            res.write('{ "err": 1, "msg": "password is required" }')
            res.end()
        } else if (!/^\w{4,16}$/.test(user)) {
            res.write('{ "err": 1, "msg": "invaild name" }')
            res.end()
        } else if (/['|"]$/.test(pass)) {
            res.write('{ "err": 1, "msg": "invaild password" }')
            res.end()
        } else {
            db.query(`SELECT * FROM user_table WHERE username='${user}'`, (err, data) => {
                if (err) {
                    res.write('{ "err": 1, "msg": "database error" }')
                    res.end()
                } else if (data.length == 0) {
                    res.write('{ "err": 1, "msg": "no this user" }')
                    res.end()
                } else if (data[0].password !== md5_2(pass)) {
                    res.write('{ "err": 1, "msg": "username or password is incorrect" }')
                    res.end()
                } else {
                    res.write('{ "err": 0, "msg": "success" }')
                    res.end()
                }
            })
        }
            break;
        default:
            let rs = fs.createReadStream(`www${pathname}`)
            let gz = zlib.createGzip()

            res.setHeader('content-encoding', 'gzip')
            rs.pipe(gz).pipe(res)

            rs.on('error', err => {
                res.writeHead(404)
                res.write('not found')
                res.end()
            })
    }
}).listen(2525)