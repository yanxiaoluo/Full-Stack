const pug = require('pug')

console.log(pug.renderFile('./template/pug/1.pug', {
    pretty: true,
    name: 'yanxl',
    a: 12,
    b: 22,
    arr: [1,2,3],
}))