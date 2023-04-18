const express = require('express')
const router = express.Router()
const OpenaiController = require('../controllers/openai.controller')

router.post('/', OpenaiMiddleware, OpenaiController.feedbackSuggest)

module.exports = router
