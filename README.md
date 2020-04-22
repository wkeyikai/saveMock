# saveMock using
```json
devServer: {
  proxy: {
    onProxyRes: saveMock('mock/data')
  }
}
