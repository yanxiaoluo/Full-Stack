const express = require('express')

let router = express.Router()

router.get('/:id', (req, res) => {
    res.send('用户信息')
})
router.get('/:id/comment', (req, res) => {
    res.send('用户评论')
})

module.exports = router