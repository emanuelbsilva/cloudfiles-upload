const pkgcloud = require('pkgcloud')
const Container = require('./Container').Container

const CloudFiles = function ({ username, apiKey, region }) {
  const client = pkgcloud.storage.createClient({
    provider: 'rackspace',
    username,
    apiKey,
    region
  })

  this.getContainer = function (container) {
    return new Container({ client, container })
  }

  return this
}

module.exports = { CloudFiles }
