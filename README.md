# saveMock using
```webpack
module.exports = {
  devServer: {
    proxy: {
      onProxyRes: saveMock('mock/data')
    }
  }
}
