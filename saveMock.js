const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
module.exports = {
  saveMock: (dir) => {
    return (proxyRes, req, res) => {
      const url = res.req.url
      console.log('save', res.req.url)
      if (proxyRes.statusCode !== 200) {
        console.log('error:statusCode=', proxyRes.statusCode)
        return
      }
      var body = []
      const createFile = (dir) => {
        return !fs.existsSync(dir) && fs.mkdirSync(dir)
      }
      const files = url.split('/').filter((file) => {
        return file
      })
      proxyRes.on('data', function(chunk) {
        body.push(chunk)
      })
      proxyRes.on('end', () => {
        body = Buffer.concat(body).toString()
        files.forEach(async(file, i) => {
          const _dir = files.slice(0, i + 1).join('/')
          await createFile(dir + '/' + _dir)
        })
        try {
          if (typeof JSON.parse(body) === 'object') {
            fs.writeFile(dir + '/' + url + '/data.json', body, 'utf8', (err) => {
              err && console.log(err)
            })
          }
        } catch (e) {
          console.log('json is not exist:', body)
        }
      })
    }
  }
}
