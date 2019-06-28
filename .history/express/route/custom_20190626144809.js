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

router.post('/', (req, res) => {
    let {title, description, src} = req.body

    if (req.body.mod_id) {
        db.query(`UPDATE banner_table SET title='${req.body.title}',description='${req.body.description}',title='${req.body.href}' WHERE ID=${req.body.mod_id}`, (err, data) => {
            if (err) {
                console.error(err)
                res.status(500).send('database error').end()
            } else {
                res.redirect('admin/bannners')
            }
        })
    } else {
        db.query(`INSERT INTO banner_table (title, description, href) VALUES('${title}', '${description}', '${href}')`, (err, data) => {
            if (err) {
                console.error(err)
                res.status(500).send('database error').end()
            } else {
                res.redirect('admin/bannners')
            }
        })
    }
})

module.exports = router