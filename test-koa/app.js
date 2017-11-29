const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const templating = require('./templating');

const isProduction = require('./templating');

//第一个middleware记录URL以及页面执行时间：
app.use(async (ctx, next) => {
    console.log(`type:${ctx.request.method},${ctx.request.url}`);
    var 
        start = new Date().getTime(),
        execTime;
    await next();
        execTime = new Date().getTime() - start;
        ctx.response.set(`X-Response-Time`, `${execTime}ms`);
});

//第二个middleware处理静态文件：
if(!isProduction){
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/',__dirname + '/static'));
}

//第三个middleware解析POST请求：
app.use(bodyParser());

//第四个middleware给ctx加上render()来使用Nunjucks：
app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}));





