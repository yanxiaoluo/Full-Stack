const urlLib = require('url')
const pathLib = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')

//createClient——以前的写法
let req = http.request('http://www.baidu.com', res => {
    if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode == 304) {
        let arr = []
        res.on('data', data => {
            arr.push(data)
        })
        res.on('end', () => {
            let buffer = Buffer.concat(arr)

            fs.writeFile(pathLib.resolve('spider', 'baidu.html'), buffer, err => {
                if (err) {
                    console.log('写入失败', err)
                } else {
                    console.log('成功')
                }
            })
        })
    } else {
        console.log('错了', res.statusCode)
    }
})

req.on('error', err => {
    console.log('err', err)
})

req.write('') //发送post数据
req.end()   //正式开始请求