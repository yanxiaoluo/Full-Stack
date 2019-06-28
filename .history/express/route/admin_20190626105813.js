const express = require('express');
const crpytoMd5 = require('../../libs/crpyto_md5');
const mysql = require('mysql');

const db = mysql.createPool({ host: '192.168.1.70', user: 'root', password: '12345678', database: 'blog' })

var router = express.Router();

//检查登陆状态
router.use((req, res, next) => {
    if (!req.session['admin_id'] && req.url != '/login') {//没有登陆
        res.redirect('/admin/login')
    } else {
        next()
    }
})

router.get('/login', (req, res) => {
    res.render('admin/login.ejs', {})
})

router.post('/login', (req, res, next) => {
    let username = req.body.username
    let password = crpytoMd5.md5(req.body.password+crpytoMd5.MD5_SUFFIX)

    console.log(username, password)
    res.render('admin/index.ejs', {})

    // db.query(`SELECT * FROM admin_table WHERE username = '${username}'`, (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         res.status(500).send('database error').end()
    //     } else {
    //         if (data.length == 0) {
    //             res.status(400).send('no this admin').end()
    //         } else {
    //             if (data[0].password == password) {
    //                 req.session['admin_id'] = data.ID
    //             } else {
    //                 res.status(400).send('this password is incorrect').end()
    //             }
    //         }
    //     }
    // })
});

router.get('/', (req, res) => {
    console.log('index.ejs')
    res.render('admin/index.ejs', {})
})

router.get('/banners', (req, res) => {
    res.render('admin/bannners.ejs', {})
})

module.exports = router