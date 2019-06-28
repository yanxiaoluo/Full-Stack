const express = require('express');
//处理、读取静态文件
const static = require('express-static');
const cookiepar = require('cookie-parser');
const cookiesession = require('cookie-session');
//不能解析post文件，只能解析post数据
const bodypar = require('body-parser');
//解析文件
const multer = require('multer');
//模板引擎（用来解析模板）
const consolidate = require('consolidate');
// const jade = require('jade');
// const ejs = require('ejs');
const mysql = require('mysql');

//连接池
const db = mysql.createPool({ host: '192.168.1.70', user: 'root', password: '12345678', database: 'blog' })

let server = express()

server.listen(2022)
//1、解析cookie
server.use(cookiepar('bmnsbdfbsfjkabshjdfbhjsf'))

//2、使用session
let arr = []
for (let i = 0; i < 100000; i++) {
    arr.push('keys_' + Math.random())
}
server.use(cookiesession({name: 'zng_se_id', keys: arr, maxAge: 20*60*1000}))

//3、post数据
server.use(bodypar.urlencoded({extended: false}))
server.use(multer({dest: './www/upload/'}).any())

//4、配置模版引擎

//输出什么东西
server.set('view engine', 'html')
//模板文件放在哪儿
server.set('views', './template')
//哪种模板引擎
server.engine('html', consolidate.ejs)

//接收用户请求
server.get('/', (req, res, next) => {
    db.query('SELECT * FROM banner_table', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('wrong').end()
        } else {
            res.banners = data
            next()
        }
    })
})

server.get('/', (req, res, next) => {
    db.query('SELECT ID,title,summary FROM article_table', (err, data) => {
        if (err) {
            res.status(500).send('wrong').end()
        } else {
            res.articles = data
            next()
        }
    })
})

server.get('/', (req, res) => {
    res.render('index.ejs', { bannners: res.banners, articles: res.articles })
})

server.get('/art', (req, res) => {
    if(req.query.id) {
        if (req.query.act == 'like') {
            db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, (err, data) => {
                if (err) {
                    res.status(500).send('data is wrong').end()
                    console.error(err)
                } else {
                    db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
                        if (err) {
                            res.status(500).send('data is wrong').end()
                        } else {
                            if (data.length == 0) {
                                res.status(404).send('can not find your art')
                            } else {
                                let artdata = data[0]
                                artdata.content = artdata.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>')
                                res.render('art.ejs', { artdatas: artdata })
                            }
                        }
                    })
                }
            })
        } else {
            db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
                if (err) {
                    res.status(500).send('data is wrong').end()
                } else {
                    if (data.length == 0) {
                        res.status(404).send('can not find your art')
                    } else {
                        let artdata = data[0]
                        artdata.content = artdata.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>')
                        res.render('art.ejs', { artdatas: artdata })
                    }
                }
            })
        }
    }
})

//5、static数据
server.use(static('../www'))

console.log('your server is running on 2022')