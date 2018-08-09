module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: 'zzp.test.jd.com',
        port: 8089,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://tco.jd.com/',
                ws: true,
                changeOrigin: true
            },
            '/v1.0': {
                target: 'http://wangtie.util.tco.jd.com/',
                changeOrigin: true
            }
        }, // string | Object
        before: app => {
            // `app` 是一个 express 实例
        }
    }
};
