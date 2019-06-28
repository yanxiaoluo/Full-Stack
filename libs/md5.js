const crpyto = require('./crpyto_md5')
let str = '4983205'
console.log(crpyto.md5(str+crpyto.MD5_SUFFIX))