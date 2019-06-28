const crpyto = require('crypto')

let obj = crpyto.createHash('md5')
obj.update('123456')
let str = obj.digest('hex')
console.log(str)