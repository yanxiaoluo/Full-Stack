const Mysql = require('mysql-pro')
const config = require('../config.js')

let db = new Mysql({
    mysql: {
        host: config.db_host,
        port: config.db_port,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_name,
    }
})

db.excute = async sql => {
    await db.startTransaction()

    let res
    if (typeof sql == 'string') {
        res = await db.executeTransaction(sql)
    } else {
        sql.forEach(async ele => {
            res = await ele.executeTransaction(ele)
        })
    }

    await db.stopTransaction()

    return res
}
module.exports = db