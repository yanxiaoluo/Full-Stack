const MongoClient = require('mongodb').MongoClient;
const Config = require('./mongo_config');
const ObjectID = require('mongodb').ObjectID;

class Db {
    static getInstance() { // 单例  多次实例化实例不共享的问题
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }
    constructor() {
        this.dbClient = ''
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (!this.dbClient) {   // 解决数据库多次连接的问题
                MongoClient.connect(Config.dbUrl, {useNewUrlParser: true}, (err, client) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        this.dbClient = client.db(Config.dbName);
                        resolve(this.dbClient);
                    }
                })
            } else {
                resolve(this.dbClient)
            }
        })
    }

    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(collectionName).find(json);
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err)
                        return
                    } else {
                        resolve(docs)
                    }
                })
            })
        })
    }

    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, docs) => {
                    if (err) {
                        reject(err)
                        return
                    } else {
                        resolve(docs)
                    }
                })
            })
        })
    }

    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).insertOne(json, (err, docs) => {
                    if (err) {
                        reject(err)
                        return
                    } else {
                        resolve(docs)
                    }
                })
            })
        })
    }

    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).removeOne(json, (err, docs) => {
                    if (err) {
                        reject(err)
                        return
                    } else {
                        resolve(docs)
                    }
                })
            })
        })
    }

    getObjectId(id) {
        return new ObjectID(id)
    }
}

module.exports = Db.getInstance();

// let my = Db.getInstance()
// let my2 = Db.getInstance()

// setTimeout(() => {
//     console.time('start1')
//     my.find('user', {}).then(data => {
//         // console.log(data)
//         console.timeEnd('start1')
//     })
// }, 100)

// setTimeout(() => {
//     console.time('start2')
//     my.find('user', {}).then(data => {
//         // console.log(data)
//         console.timeEnd('start2')
//     })
// }, 3000)

// setTimeout(() => {
//     console.time('start11')
//     my2.find('user', {}).then(data => {
//         // console.log(data)
//         console.timeEnd('start11')
//     })
// }, 5000)

// setTimeout(() => {
//     console.time('start22')
//     my2.find('user', {}).then(data => {
//         // console.log(data)
//         console.timeEnd('start22')
//     })
// }, 8000)