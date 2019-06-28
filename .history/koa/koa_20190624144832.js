const Koa = require('koa')
const Router = require('koa-router')
const staticCache = require('koa-static-cache')
const pathLib = require('path')
const body = require('koa-better-body')
const convert = require('koa-convert')
const session = require('koa-session')
const config = require('./config')
const error = require('./libs/error_handler')
const logLib = require('./libs/log')

const db = require('./libs/db')

const server = new Koa()
server.listen(config.port)

//错误处理
error(server)
logLib(server)

server.use(async (ctx, next) => {
    ctx.db = db
    await next()
})

server.use(convert(body({
    uploadDir: config.uploadDir
})))

server.keys = config.secret_key
server.use(session({}, server))

let mainRouter = new Router()
mainRouter.use('/', require('./routers/index'))

server.use(mainRouter.routes())

server.use(staticCache(config.wwwDir))