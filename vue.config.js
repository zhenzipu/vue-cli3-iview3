module.exports = {
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8089,
    https: false,
    hotOnly: false,
    proxy: {
      "/activity": {
        target: "https://example.ipay.so/marketing",
        ws: true,
        changeOrigin: true
      }
    }, // string | Object
    before: app => {
      // `app` 是一个 express 实例
    }
  }
};
