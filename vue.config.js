const CompressionPlugin = require('compression-webpack-plugin')
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
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [
                    new CompressionPlugin({
                        algorithm: 'gzip', // 使用gzip压缩
                        test: /\.js$|\.html$|\.css/, //匹配文件名
                        threshold: 10240, //对超过10k的数据进行压缩
                        minRatio: 1, // 压缩率小于1才会压缩
                        deleteOriginalAssets: false //是否删除原文件
                })
                ]
            }
        }
    },
    lintOnSave: false
}

