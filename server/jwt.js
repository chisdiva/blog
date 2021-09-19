// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

let cert = '132Bgsi2dulkasjflkasf';//私钥 可以自己生成
// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;
    }
    //生成token
    generateToken() {
        return jwt.sign(this.data.toJSON(), cert, {
            //要用toJSON转换，否则报错
            //过期时间10小时
            expiresIn: 60*60*10
        })
    }

    // 校验token
    verifyToken() {
        let token = this.data
        return new Promise((resolve, reject) => {
            jwt.verify(token, cert, (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports = Jwt;