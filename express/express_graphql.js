const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

// const schema = buildSchema(`
//     type Account {
//         name: String
//         age: Int
//         sex: String
//         department: String
//     }
//     type Query {
//         hello: String
//         accountName: String
//         age: Int,
//         account: Account
//     }
// `)
const schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
        department: String
        salary(city: String): Int
    }

    type Query {
        getClassMates(classNo: Int!): [String]
        account(username: String): Account
    }
`)

const root = {
    getClassMates ({ classNo }) {
        const obj = {
            10: ['张三', '李四', '王五'],
            11: ['张小三', '李小四', '王小五'],
        }
        return obj[classNo]
    },
    account ({ username }) {
        const name = username
        const sex = 'man'
        const age = 18
        const department = '技术部'
        const salary = ({ city }) => {
            if (city === '北京' || city === '上海') {
                return 10000
            }
            return 3000
        }
        
        return {
            name,
            sex,
            age,
            department,
            salary            
        }
    },
    // hello: () => {
    //     return 'world'
    // },
    // accountName: () => {
    //     return '张三丰'
    // },
    // age: () => {
    //     return 18
    // },
    // account: () => {
    //     return {
    //         name: '我是哈哈',
    //         age: 5,
    //         sex: "女",
    //         department: '科学院'
    //     }
    // }
}

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.use(express.static('public'));

app.listen(3322);