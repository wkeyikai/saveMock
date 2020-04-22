# saveMock using

devServer: {
  proxy: {
    onProxyRes: saveMock('mock/data')
  }
}
