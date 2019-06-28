const request = require('../libs/request');
const fs = require('fs');

(async () => {
    try {
        let { body, headers } = await request('http://tmall.com')
        console.log(body, headers)

        fs.writeFile(`spider/zhihu.html`, body, err => {
            err ? console.log(err) : console.log('成功')
        })
    } catch (e) {
        console.log('请求失败')
        console.log(e)
    }
})()