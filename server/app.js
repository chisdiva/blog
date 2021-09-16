const express = require('express')

const bodyParse = require('body-parser')
const router = require('./router')

const app = express()

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.use(bodyParse.urlencoded({extended: false}))

app.use(bodyParse.json())

app.use('/', router)

app.listen(7866, function() {
    console.log('running 7866...');
})