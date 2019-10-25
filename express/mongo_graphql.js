const express = require('express');
const DB = require('../libs/mongo_db');

const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const graphqlHTTP = require('express-graphql');


// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1/account", {useNewUrlParser: true});

// let accoInfo = mongoose.model("accoInfo");

// var AccountType = new graphql.GraphQLObjectType({
//     name: 'Account',
//     fields: {
//         name: { type: graphql.GraphQLString },
//         age: { type: graphql.GraphQLInt },
//         sex: { type: graphql.GraphQLString },
//         department: { type: graphql.GraphQLString }
//     }
// });

// var queryType = new graphql.GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         account: {
//             type: AccountType,
//             args: {
//                 username: { type: graphql.GraphQLString }
//             },
//             resolve: function (_, { username }) { 
//                 const name = username
//                 const sex = 'man'
//                 const age = 18
//                 const department = 'IT'
//                 return {
//                     name,
//                     sex,
//                     age,
//                     department
//                 }
//             }
//         }
//     }
// });

// var schema = new graphql.GraphQLSchema({ query: queryType });

// const root = {
//     accounts() {
//         var arr = []
//         for (const key in fakeDb) {
//             arr.push(fakeDb[key])
//         }
//         return arr
//     },
//     createAccount({ input }) {
//         const data = {
//             name: input.name,
//             sex: input.sex,
//             age: input.age,
//             department: input.department,
//         }
//         return accoInfo.insertMany(data)
//     },
//     updateAccount({ id, input }) {
//         // 相当于数据库的更新
//         const updateAccount = Object.assign({}, fakeDb[id], input)
//         fakeDb[id] = updateAccount
//         return updateAccount
//     }
// }

let UserSchema = new GraphQLObjectType({
    name: 'user',
    fields: {
        _id: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        sex: {
            type: GraphQLString
        },
        department: {
            type: GraphQLString
        }
    }
})

let NewsSchema = new GraphQLObjectType({
    name: 'news',
    fields: {
        _id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        time: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
    }
})


let UserRoot = new GraphQLObjectType({
    name: 'root',
    fields: {
        getUser: {
            type: UserSchema,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let userList = await DB.find('user', { "_id": DB.getObjectId(args.id) })
                return userList[0]
            }
        },
        getAllUser: {
            type: GraphQLList(UserSchema),
            async resolve(parent, args){
                let userList = await DB.find('user')
                return userList
            }
        },
        getNews: {
            type: NewsSchema,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let userList = await DB.find('news', { "_id": DB.getObjectId(args.id) })
                return userList[0]
            }
        },
        getAllNews: {
            type: GraphQLList(NewsSchema),
            async resolve(parent, args){
                let userList = await DB.find('news')
                return userList
            }
        }
    }
})

let MyUser = new GraphQLSchema({
    query: UserRoot
})

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: MyUser,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send('你好鸭')
})

app.get('/getNavList', async (req, res) => {
    let result = await DB.find('user', {})
    res.send(result)
})

app.get('/addNavList', async (req, res) => {
    let result = await DB.insert('user', { "username":"嘻嘻","age":52,"sex":"女","department":"人事部" })
    res.send(result)
})

app.get('/editNavList', async (req, res) => {
    let result = await DB.update('user', { "username":"嘻嘻" }, { "username":"啦啦" })
    res.send(result)
})

app.get('/delNavList', async (req, res) => {
    let result = await DB.remove('user', { "username":"啦啦" })
    res.send(result)
})

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }))

app.listen(3324);