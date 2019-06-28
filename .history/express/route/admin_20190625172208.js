const express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.send('我是damin').end()
});
router.get('/2.html', function (req, res) {
    res.send('我是文章2').end()
});

module.exports = router