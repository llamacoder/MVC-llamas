const uuid = require('uuid/v4')
const llamas = []


function getAll() {
  return llamas
}

function getOne(id) {
  return llamas.find(llama => llama.id === id)
}

function create(name, color, sire, dam) {
  const llama = { id: uuid(), name, color, sire, dam }
  llamas.push(llama)
  return llama
}

function updateOne(id, name, color, sire, dam) {
  const llama = getOne(id)
  if (llama) {
    llama.name = name
    llama.color = color
    llama.sire = sire
    llama.dam = dam
  }
  return llama
}

function deleteOne(id) {
  const llama = getOne(id)
  const index = llamas.indexOf(llama)
  if (index === -1) return false         //  not successful
  llamas.splice(index,1)
  return true
}

module.exports = {
  getAll, create, getOne, updateOne, deleteOne
}
