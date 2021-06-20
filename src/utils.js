const fs = require('fs/promises')

const getPathType = async (path) => {
  const stats = await fs.stat(path)
  return stats.isFile() ? 'file' : 'directory'
}

const asyncFilter = async (arr, func) => {
  const result = await Promise.all(arr.map(func))
  return arr.filter((v, index) => result[index])
}

const isPathFile = async (file) => {
  const fileType = await getPathType(file)
  return fileType === 'file'
}

const ensureSlashAtThenEnd = (path) => {
  return path[path.length - 1] === '/' ? path : path + '/'
}

const parallelMap = async (arr, f, n = Infinity, inPlace = false) => {
  const results = inPlace ? arr : Array(arr.length)
  const entries = arr.entries()

  const worker = async () => {
    for (const [key, val] of entries) results[key] = await f(val, key)
  }

  await Promise.all(Array.from({ length: Math.min(arr.length, n) }, worker))

  return results
}

module.exports = {
  getPathType,
  asyncFilter,
  isPathFile,
  ensureSlashAtThenEnd,
  parallelMap
}
