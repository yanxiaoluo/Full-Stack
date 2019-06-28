const JSDOM =require('jsdom').JSDOM;
const fs = require('fs');
const request = require('./libs/request.js');
const Mysql = require('mysql-pro')
const gbk = require('gbk')

let db = new Mysql({
    mysql: {
        host: 'cvm.idevent.cc',
        port: 3306,
        user: 'root',
        password: 'haijiao920815',
        database: '20190505'
    }
})

async function query (sql) {
    await db.startTransaction()
    let data = db.executeTransaction(sql)
    await db.stopTransaction()

    return data
}

function html2$ (html) {
    let document = new JSDOM(html).window.document;
    return document.querySelectorAll.bind(document);
}

function indexParser (buffer) {
    let $ = html2$(html2$(buffer.toString())('textarea.f1')[0].value)
    return Array.from($('li')).map(li=> {
        let oA = li.getElementsByClassName('mod-g-photo')[0]

        return {
            url:        'https:'+oA.href,
            img_src:    'https:'+oA.children[0].getAttribute('data-lazyload-src'),
            name:       li.getElementsByClassName('mod-g-tit')[0].children[0].innerHTML,
            desc:       li.getElementsByClassName('mod-g-desc')[0].innerHTML,
            price:      `${980*Math.random()}`,
            sales:      `${1980*Math.random()}`
        }
    })
}

async function indexSpider () {
    try {
        let {body, headers} = await request('https://shouji.tmall.com/')
        let datas = indexParser(body)
        indexProcessor(datas)
    } catch (e) {
        console.log('请求失败')
        console.log(e)
    }
}


async function indexProcessor (datas) {
    
    for (let i = 0; i < datas.length; i++) {
        let rows = await query(`SELECT * FROM item_table WHERE url='${datas[i].url}'`)
        if (rows.length > 0) {
            await query(`UPDATE item_table SET img_src='${datas[i].img_src}', name='${datas[i].name}', description='${datas[i].desc}', price='${datas[i].price}', sales='${datas[i].sales}' WHERE ID='${rows[0].ID}'`)
        } else {
            await query(`INSERT INTO item_table (ID, url, img_src, name, description, price, sales) VALUES(0, '${datas[i].url}', '${datas[i].img_src}', '${datas[i].name}', '${datas[i].desc}', '${datas[i].price}', '${datas[i].sales}')`)
        }
        // console.log(datas[i])
    }

    for (let i = 0; i < datas.length; i++) {
    // for (let i = 0; i < 1; i++) {
        await detailSpider(datas[i].url)
    }
}

async function detailSpider (url) {
    try {
        let {body, headers} = await request(url)
        let datas = detailParser(body)
        detailProcessor(datas)
    } catch (e) {
        console.log('detail请求失败')
        console.log('detail请求失败' + e)
    }
}

function detailParser (body) {
    let $ = html2$(gbk.toString('utf-8', body))
    let attributes = []

    Array.from($('.attributes-list li')).map(li => {
        // console.log(li)
        let n = li.innerHTML.search(/：|:/)
        if (n == -1) return

        let key = li.innerHTML.substring(0, n)
        let val = li.innerHTML.substring(n+1).replace(/[&nbsp;]/g, '')

        attributes.push(val)
    })
    return attributes
}



async function detailProcessor (datas) {
    let rows = await query(`SELECT * FROM phone_table WHERE certified_num='${datas[0]}'`)
    if (rows.length > 0) {
        await query(`UPDATE phone_table SET certified_status='${datas[1]}', product_name='${datas[2]}', product_color='${datas[6]}'`)
        console.log('更新完成')
    } else {
        await query(`INSERT INTO phone_table (certified_num, certified_status, product_name, product_color) VALUES('${datas[0]}', '${datas[1]}', '${datas[2]}', '${datas[6]}')`)
        console.log('插入完成')
    }
}

(async () => {
    await indexSpider()
})()