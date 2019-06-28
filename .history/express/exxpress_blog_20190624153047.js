const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '20190502'
})

db.query("SELECT * FROM `user_table`;", (err, data) => {
    if (err)
        console.log('wrong', err)
    else
        console.log('success', JSON.stringify(data))
})