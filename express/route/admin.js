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

router.get('/', (req, res) => {
    res.render('admin/index.ejs', {})
})

router.use('/login', require('./login'));
router.use('/banners', require('./banners'));
router.use('/custom', require('./custom'));

module.exports = router