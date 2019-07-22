function sum (a,b,cb) {
    setTimeout(() => {
        return cb(a+b)
    }, 2000);
}

sum(3, 4, function(m) {
    console.log(m)
})

console.log('hello')

//封装一个promise
class myPromise {
    constructor(fn){
        this.cb = null
        let self = this
        fn(function(a){
            self.cb(a)
        })
    }
    then(cb){
        cb = this.cb
    }
}

function afterSum (a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000);
    })
}

// afterSum(1,2).then((m) => {
//     console.log(m)
//     return afterSum(2, 3)
// }).then(m => {
//     console.log(m)
// })

async function main() {
    let m = await afterSum(9,10)
    console.log(m)
}

main()

const fs = require('fs');

function readFile (url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

(async function () {
    let str = await readFile('../package.json')
    console.log(str.toString())
})()

