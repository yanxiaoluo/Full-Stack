const DB = require('../libs/mongo_db');

const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

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

let RootSchema = new GraphQLObjectType({
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

module.exports = new GraphQLSchema({
    query: RootSchema
})