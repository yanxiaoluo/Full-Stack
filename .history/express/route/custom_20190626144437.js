const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({ host: '192.168.1.70', user: 'root', password: '12345678', database: 'blog' })

var router = express.Router();

router.get('/', (req, res) => {
    db.query(`SELECT * FROM custom_table`, (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('database error').end()
        } else {
            res.render('admin/custom.ejs', {data})
        }
    })
})

module.exports = router