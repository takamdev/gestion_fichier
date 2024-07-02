const express = require('express')

const router = express.Router()
const controller = require('./../controller/controllerFichier.js')
router.get('/',controller.home)
router.post('/upload',controller.upload)
router.get('/file/:id/delete',controller.deleteFile)
module.exports = router