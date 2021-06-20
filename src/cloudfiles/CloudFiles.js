const pkgcloud = require('pkgcloud')
const { Container } = require('./Container')

class CloudFiles {
  constructor({ username, apiKey, region }) {
    this.client = pkgcloud.storage.createClient({
      provider: 'rackspace',
      username,
      apiKey,
      region,
    })
  }

  getContainer(container) {
    return new Container({ client: this.client, container })
  }
}

module.exports = { CloudFiles }
