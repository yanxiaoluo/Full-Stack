const express = require('express');

var router = express.Router();

//检查登陆状态
router.get('/login', (req, res) => {
    res.render('admin/login.ejs', {})
});

module.exports = router