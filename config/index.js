module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/data': {
                target: 'http://localhost:7866',//后端接口地址
                changOrigin: true,
                pathRewrite: {
                    '^/data': ''
                }
            }
        }
    }
}