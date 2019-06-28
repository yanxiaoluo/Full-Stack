const Router = require('koa-router')

let router = new Router()

router.get('', async ctx => {
    let page = 1, page_size = 5
    let data = await ctx.db.excute(`
        SELECT U.ID, U.username, A.answer_ID, A.content FROM 
        user_table AS U 
        LEFT JOIN ans_table AS A ON U.ID=A.answer_ID 
        LIMIT ${ (page-1)*page_size },${ page_size }
    `)

    ctx.body = data
})

router.get('a', async ctx => {
    ctx.body = 'aaaaaaaaaa'
})

router.get('b', async ctx => {
    ctx.body = 'bbbbbbbbbb'
})

module.exports = router.routes()
