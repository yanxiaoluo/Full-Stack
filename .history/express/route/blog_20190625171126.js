const express = require('express');

var router = express.Router();

router.get('/a.html', function (req, res) {
    res.send('我是文章11').end()
})
router.get('/b.html', function (req, res) {
    res.send('我是文章22').end()
})

module.exports = router