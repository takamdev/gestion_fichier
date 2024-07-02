const express = require('express')

const router = express.Router()
const controller = require('./../controller/controllerFichier.js')
router.get('/',controller.home)
router.post('/upload',controller.upload)

module.exports = router