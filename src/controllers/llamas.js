const model = require('../models/llamas')

function getAll(req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function create(req, res, next) {
  const {name, color, sire, dam} = req.body
  if (!name || !color || !sire || !dam) return next({ status: 400, message: `Fields name, color, sire, and dam are required` })
  const llama = model.create(name, color, sire, dam)
  res.status(201).json({ data: llama })
}

function getOne(req, res, next) {
  const id = req.params.id
  const llama = model.getOne(id)
  if (llama === undefined) return next({ status: 404, message: `Could not find dog with id of ${id}` })
  res.status(200).json({ data: llama })
}

function updateOne(req, res, next) {
  const {name, color, sire, dam} = req.body
  if (!name || !color || !sire || !dam) return next({ status: 400, message: `Fields name, color, sire, and dam are required` })
  const id = req.params.id
  const llama = model.updateOne(id, name, color, sire, dam)
  if (!llama) return next({ status: 404, message: 'Could not find llama with id ${id}!'})
  res.status(200).json({data:llama})
}

function deleteOne(req, res, next) {
  const id = req.params.id
  const success = model.deleteOne(id);
  if (!success) return next({ status: 404, message: `Could not find llama` })
  res.sendStatus(204)
}

module.exports = {
  getAll, create, getOne, updateOne, deleteOne
}
