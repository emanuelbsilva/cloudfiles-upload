// cloudfiles-upload --dir ./build/
const { Command } = require('commander')
const promisify = require('util').promisify
const glob = promisify(require('glob').glob)
const {
  getPathType,
  asyncFilter,
  isPathFile,
  ensureSlashAtThenEnd,
  parallelMap
} = require('./utils')

const CloudFiles = require('./cloudfiles/CloudFiles').CloudFiles

const program = new Command()

async function run(argv) {
  program
    .requiredOption('-u, --username <username>', 'Rackspace username')
    .requiredOption('-k, --apikey <apikey>', 'Rackspace api-key')
    .requiredOption('-r, --region <region>', 'Rackspace region')
    .requiredOption('-c, --container <container>', 'Rackspace Container')
    .requiredOption('-f, --file <file>', 'files to upload')
    .requiredOption('-o, --output <output>', 'Remote location')

  program.parse(argv)
  const options = program.opts()

  const remote = ensureSlashAtThenEnd(options.output)

  const container = new CloudFiles({
    username: options.username,
    apiKey: options.apikey,
    region: options.region
  }).getContainer(options.container)

  const pathType = await getPathType(options.file)

  switch (pathType) {
    case 'file':
      console.log(`uploading ${options.file} to ${options.output}`)
      await container.upload({ file: options.file, remote: options.output })
      break

    case 'directory':
      if (options.file[options.file.length] !== '/') options.file += '/'
      const globFiles = await glob(options.file + '**')
      const files = await asyncFilter(globFiles, isPathFile)

      await parallelMap(
        files,
        async (file) => {
          const remoteFile = remote + file
          console.log(`uploading ${file} to ${remoteFile}`)
          return container.upload({ file, remote: remoteFile })
        },
        10
      )

      break

    default:
      throw new Error('path type not recognized')
  }
}

run(process.argv)
