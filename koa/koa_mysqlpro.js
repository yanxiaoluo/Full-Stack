const koa = require('koa')
const router = require('koa-router')
const Mysql = require('mysql-pro')

const db = new Mysql({
    mysql: {
        host: 'cvm.idevent.cc',
        port: 3306,
        user: 'root',
        password: 'haijiao920815',
        database: '20190505'
    }
})

const server = new koa()
server.listen(9090)

let r1 = router()
server.use(r1.routes())

r1.get('/user', async ctx => {
    await db.startTransaction()
    let data = await db.executeTransaction("SELECT * FROM user_table")
    await db.stopTransaction()
    console.log(data)
    ctx.response.body = data
})