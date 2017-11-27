const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/llamas')


router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.get('/:id', ctrl.getOne)
router.put('/:id', ctrl.updateOne)
router.delete('/:id', ctrl.deleteOne)

module.exports = router
