const express = require('express');

var router = express.Router();

//检查登陆状态
router.use((req, res, next) => {
    if (!req.session['admin_id'] && req.url != '/admin/login') {//没有登陆
        res.redirect('/admin/login')
    } else {
        next()
    }
})

router.get('/login', (req, res) => {
    res.render('admin/login.ejs', {})
});

module.exports = router