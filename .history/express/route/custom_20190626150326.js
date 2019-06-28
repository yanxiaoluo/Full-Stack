const express = require('express');
const mysql = require('mysql');
const pathLib = require('path');

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

    let ext = pathLib.parse(req.files[0].originalname).ext
    let oldPath = req.files[0].path
    let newPath = req.files[0].path+ext

    let newFileName = req.files[0].filename+ext

    false.rename(oldPath, newPath, err => {
        if (err) {
            res.status(500).send('file operation error').end()
        } else {
            if (req.body.mod_id) {
                db.query(`UPDATE custom_table SET title='${title}',description='${req.body.description}',title='${newFileName}' WHERE ID=${req.body.mod_id}`, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('database error').end()
                    } else {
                        res.redirect('admin/custom')
                    }
                })
            } else {
                db.query(`INSERT INTO custom_table (title, description, src) VALUES('${title}', '${description}', '${src}')`, (err, data) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send('database error').end()
                    } else {
                        res.redirect('admin/bannners')
                    }
                })
            }
        }
    })
})

module.exports = router