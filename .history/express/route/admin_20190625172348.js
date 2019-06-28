const express = require('express');

var router = express.Router();

router.get('/login', (req, res) => {
    res.render('admin/login.ejs', {})
});

module.exports = router