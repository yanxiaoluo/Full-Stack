const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const schema = buildSchema(`
    input AccountInput {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Account {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Mutation {
        createAccount(input: AccountInput): Account
        updateAccount(id: ID!, input: AccountInput): Account
    }
    type Query {
        accounts: [Account]
    }
`)

const fakeDb = {}

const root = {
    accounts() {
        var arr = []
        for (const key in fakeDb) {
            arr.push(fakeDb[key])
        }
        return arr
    },
    createAccount({ input }) {
        // 相当于数据库的保存
        fakeDb[input.name] = input
        return fakeDb[input.name]
    },
    updateAccount({ id, input }) {
        // 相当于数据库的更新
        const updateAccount = Object.assign({}, fakeDb[id], input)
        fakeDb[id] = updateAccount
        return updateAccount
    }
}

const app = express();

const middleware = (req, res, next) => {
    if (req.url.indexOf('/graphql') !== -1 && req.headers.cookie.indexOf('auth') === -1) {
        console.log('hhhh')
        res.send(JSON.stringify({
            error: '您没有权限访问这个接口'
        }))
        return;
    }
    next();
}

app.use(middleware)

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.use(express.static('public'));

app.listen(3323);