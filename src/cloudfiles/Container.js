const fs = require('fs')

class Container {
  constructor({ client, container }) {
    this.client = client
    this.container = container
  }

  upload({ file, remote }) {
    return new Promise((resolve, reject) => {
      var source = fs.createReadStream(file)

      var dest = this.client.upload({
        container: this.container,
        remote,
      })

      dest.on('error', function (err) {
        console.log(err)
        reject(err)
      })

      dest.on('success', function (file) {
        resolve(file)
      })

      source.pipe(dest)
    })
  }
}

module.exports = { Container }
