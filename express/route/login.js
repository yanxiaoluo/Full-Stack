const express = require('express');
const crpytoMd5 = require('../../libs/crpyto_md5');
const mysql = require('mysql');

const db = mysql.createPool({ host: '192.168.1.70', user: 'root', password: '12345678', database: 'blog' })

var router = express.Router();

router.get('/login', (req, res) => {
    res.render('admin/login.ejs', {})
})
router.post('/login', (req, res, next) => {
    let username = req.body.username
    let password = crpytoMd5.md5(req.body.password+crpytoMd5.MD5_SUFFIX)

    console.log(username, password)

    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('database error').end()
        } else {
            if (data.length == 0) {
                res.status(400).send('no this admin').end()
            } else {
                if (data[0].password == password) {
                    req.session['admin_id'] = data.ID
                } else {
                    res.status(400).send('this password is incorrect').end()
                }
            }
        }
    })
});

module.exports = router