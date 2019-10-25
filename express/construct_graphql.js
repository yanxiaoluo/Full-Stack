const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');

var AccountType = new graphql.GraphQLObjectType({
    name: 'Account',
    fields: {
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        sex: { type: graphql.GraphQLString },
        department: { type: graphql.GraphQLString }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        account: {
            type: AccountType,
            args: {
                username: { type: graphql.GraphQLString }
            },
            resolve: function (_, { username }) { 
                const name = username
                const sex = 'man'
                const age = 18
                const department = 'IT'
                return {
                    name,
                    sex,
                    age,
                    department
                }
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({ query: queryType });

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(3324);