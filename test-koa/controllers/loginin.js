
module.exports = {
    'POST /signin': async (ctx, next) => {
        var 
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if(email == 'hana@qq.com' && password==='111111'){
            console.log('signin ok!');
        }
    }
}