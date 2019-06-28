const ejs = require('ejs')

ejs.renderFile('./template/ejs/1.html', {
    pretty: true,
    name: 'yanxl',
    a: 12,
    b: 22,
    arr: [4,5,6],
    str: '<strong>aaa</strong>',
    header_path: 'component/header.html',
}).then(data => {
    console.log(data)
}, err => {
    console.log('渲染错误')
    console.log(err)
})