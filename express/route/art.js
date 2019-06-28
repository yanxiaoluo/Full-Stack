const express = require('express')

let router = express.Router()

router.get('/', (req, res) => {
    res.send('文章首页')
})
router.get('/:id', (req, res) => {
    let {id} = req.params
    res.send('文章内容的ID是：'+id)
})
router.get('/:id/comment', (req, res) => {
    let {id} = req.params
    res.send('文章评论的ID是：'+id)
})
router.get('/:id/edit', (req, res) => {
    let {id} = req.params
    res.send('文章编辑的ID是：'+id)
})


router.use('/aaa', require('./aaa'))

module.exports = router