const urlLib = require('url')
const pathLib = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')
const assert = require('assert')

function requestUrl (url, headers) {
    let urlObj = urlLib.parse(url)
    let httpMod = null

    if (urlObj.protocol == 'http:') {
        httpMod = http
    } else if (urlObj.protocol == 'https:') {
        httpMod = https
    } else {
        throw new Error(`协议无法识别：${urlObj.protocol}`)
    }

    return new Promise((resolve, reject) => {
        //createClient——以前的写法
        let req = httpMod.request({
            host: urlObj.host,
            path: urlObj.path,
            headers
        }, res => {
            if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode == 304) {
                let arr = []
                res.on('data', data => {
                    arr.push(data)
                })
                res.on('end', () => {
                    let buffer = Buffer.concat(arr)

                    resolve({
                        status: res.statusCode,
                        body: buffer,
                        headers: res.headers
                    })

                    // fs.writeFile(pathLib.resolve('spider', 'taobao.html'), buffer, err => {
                    //     if (err) {
                    //         console.log('写入失败', err)
                    //     } else {
                    //         console.log('成功')
                    //     }
                    // })
                })
            } else if (res.statusCode == 301 || res.statusCode == 302) {
                // console.log(res.headers)
                resolve({
                    status: res.statusCode,
                    body: null,
                    headers: res.headers
                })
            } else {
                // console.log('错了', res.statusCode)
                reject({
                    status: res.statusCode,
                    body: null,
                    headers: res.headers
                })
            }
        })

        req.on('error', err => {
            console.log('err', err)
        })

        req.write('') //发送post数据
        req.end()   //正式开始请求
    })
}

async function request (url, reqHeaders) {
    try {
        while (1) {
            let { status, body, headers } = await requestUrl(url, reqHeaders)
            // console.log('成功', status, body, headers)
    
            if (status == 200) {
                return { body, headers }
            } else {
                assert(status == 301 || status == 302)
                assert(headers.location)

                url = headers.location
            }
        }
        
    } catch (e) {
        console.log(e)
    }
}

(async () => {
    let { body, headers } = await request('http://taobao.com')
    console.log(body, headers)

    fs.writeFile(`spider/tmall.html`, body, err => {
        err ? console.log(err) : console.log('成功')
    })
})()