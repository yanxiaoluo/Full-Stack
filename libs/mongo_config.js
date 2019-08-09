const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/students", {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log("数据库连接成功")
})