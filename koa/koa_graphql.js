const Koa = require('koa');
const router = require('koa-router')();
const DB = require('../libs/mongo_db');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');

let GraphQLDefaultSchema = require('../schema/default');

const app = new Koa();

app.use(mount('/graphql', graphqlHTTP({
    schema: GraphQLDefaultSchema,
    graphiql: true
  })));

router.get('/', async (ctx) => {
    ctx.body = "首页"
})

router.get('/list', async (ctx) => {
    let list = await DB.find('user', {});
    ctx.body = list
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(5020);