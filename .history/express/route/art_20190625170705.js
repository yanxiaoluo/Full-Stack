const express = require('express');

module.exports = function () {
    var router = express.Router();
    router.get('/1.html', function (req, res) {
        res.send('我是文章1').end()
    });
    router.get('/2.html', function (req, res) {
        res.send('我是文章2').end()
    });
    return router
}