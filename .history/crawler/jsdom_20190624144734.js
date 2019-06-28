const JSDOM =require('jsdom').JSDOM;
const fs = require('fs');

function html2$ (html) {
    let document = new JSDOM(html).window.document;
    return document.querySelectorAll.bind(document);
}

fs.readFile('tmp/tmall_shouji.html', (err, buffer) => {
    if (err) {
        console.log('读取失败')
    } else {

        // let html = buffer.toString()

        // let jsdom = new JSDOM(html)

        // let document = jsdom.window.document

        // let $ = document.querySelectorAll.bind(document)

        // let oTxt = $('textarea.f1')[0].innerHTML


        let $ = html2$(html2$(buffer.toString())('textarea.f1')[0].value)
        let datas = Array.from($('li')).map(li=> {
            let oA = li.getElementsByClassName('mod-g-photo')[0]

            return {
                url:        'https:'+oA.href,
                img_src:    'https:'+oA.children[0].getAttribute('data-lazyload-src'),
                name:       li.getElementsByClassName('mod-g-tit')[0].children[0].innerHTML,
                desc:       li.getElementsByClassName('mod-g-desc')[0].innerHTML,
                price:      li.getElementsByClassName('mod-g-nprice')[0].innerHTML.match(/\d+(.\d+)?/g)[0],
                sales:      li.getElementsByClassName('mod-g-sales')[0].innerHTML.match(/\d+/g)[0],
            }
        })
        console.log(JSON.stringify(datas))

    }
})