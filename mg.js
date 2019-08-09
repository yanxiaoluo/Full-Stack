require("./libs/mongo_config");

const StuModel = require("./mongo_models/students");
// StuModel.create([
//     {
//         name: "孙悟空",
//         age: 18,
//         gender: "male",
//         address: "花果山"
//     },{
//         name: "沙和尚",
//         age: 28,
//         gender: "male",
//         address: "高老庄"
//     },{
//         name: "唐僧",
//         age: 25,
//         gender: "male",
//         address: "女儿国"
//     }
// ], err => {
//     if (!err) {
//         console.log("插入成功")
//     }
// })

StuModel.findOne({name: "沙和尚"}, (err, doc) => {
    if (!err) {
        // doc.update({$set: {age: 8}}, err => {
        //     if (!err) {
        //         console.log('修改成功')
        //     }
        // })

        // doc.age = 12
        // doc.save()

        // doc.remove(err => {
        //     console.log("删除成功")
        // })

        // console.log(doc.get('gender'))
        // console.log(doc.gender)

        // doc.set('age', 10)
        // doc.save()
        // console.log(doc.get('age'))

        // doc = doc.toObject()
        // delete doc.address
        // console.log(doc._id)
    }
})

StuModel.find({}, (err, docs) => {
    if (!err) {
        console.log(docs)
    }
})

// StuModel.find({}, {name: 1, _id:0}, (err, docs) => {
//     if (!err) {
//         console.log(docs)
//         // console.log(docs[0].gender)
//     }
// })

// StuModel.find({}, "name age -_id", {skip: 1}, (err, docs) => {
//     if (!err) {
//         console.log(docs)
//     }
// })

// StuModel.findOne({}, (err, doc) => {
//     if (!err) {
//         console.log(doc)
//     }
// })

// StuModel.findById("5d4781ec5ecac927b0f3bb6f", (err, doc) => {
//     if (!err) {
//         console.log(doc)
//         console.log(doc instanceof StuModel)
//     }
// })

// StuModel.update({name: "孙悟空"}, {$set: {age: 20}}, err => {
//     if (!err) {
//         console.log("成功")
//     }
// })

// StuModel.remove({name: "孙悟空"}, err => {
//     if (!err) {
//         console.log("删除成功")
//     }
// })
StuModel.countDocuments({}, (err, count) => {
    console.log(count)
})
// mongoose.connection.once("close", () => {
//     console.log("数据库已断开")
// })

// setTimeout(() => {
//     mongoose.disconnect()
// }, 5000);