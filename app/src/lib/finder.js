import Fuse from 'fuse.js'
const fuseOptions = {
  keys: ['name', 'user', 'host'],
}

let fuse

function find(q) {
  return fuse.search(q)
}

function load(items) {
  fuse = new Fuse(items, fuseOptions)
}

export default { load, find }
