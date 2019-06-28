const pathLib = require('path')

module.exports = {
    //basic
    port: 9090,
    uploadDir: pathLib.resolve('www/upload'),
    wwwDir: pathLib.resolve('www'),
    logPath: pathLib.resolve('log/access.log'),

    //secret
    secret_key: ['dhsiuannfrwngjwrsfd','bewuyghafirewhiejtiawrhjeiu'],

    //database
    db_host: 'cvm.idevent.cc',
    db_port: 3306,
    db_user: 'root',
    db_pass: 'haijiao920815',
    db_name: '20190505'

}