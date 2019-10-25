let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://localhost:27017/';
let dbName = 'koa';

console.time('start1')
MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    let db = client.db(dbName)

    let result = db.collection('user').find({})

    result.toArray((err, docs) => {
        console.timeEnd('start1')
        console.log(docs);   
    })
})

console.time('start2')
MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    let db = client.db(dbName)

    let result = db.collection('user').find({})

    result.toArray((err, docs) => {
        console.timeEnd('start2')
        console.log(docs);   
    })
})


// class Db {
//     static getInstance() {
//         if (!Db.instance) {
//             Db.instance = new Db()
//         }
//         return Db.instance
//     }

//     constructor() {
//         console.log("实例化会触发构造函数")
//         this.connect() 
//     }

//     connect() {
//         console.log("连接数据库")
//     }

//     find() {
//         console.log("查询数据库");    
//     }
// }

// let p1 = Db.getInstance()
// p1.find()
// let p2 = Db.getInstance()
// p2.find()
// let p3 = Db.getInstance()

// let p1 = new Db()
// let p2 = new Db()
// let p3 = new Db()