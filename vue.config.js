
module.exports = {
    devServer: {
        proxy: {
            '/data': {
                target: 'http://localhost:7866',
                ws: true,
                changeOrigin: true
            },
        }
    },
    lintOnSave: false
}

