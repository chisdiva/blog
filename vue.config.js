
module.exports = {
    devServer: {
        proxy: {
            //#代理设置
            //     location /api{
            //       proxy_pass http://110.42.141.74:7866;
            //     }
            '/api': {
                target: 'http://110.42.141.74:7866',
                //target: 'http://localhost:7866',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' //api替代target中的地址
                }
            },
        }
    },
    lintOnSave: false
}

