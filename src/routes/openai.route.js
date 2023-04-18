const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require('openai')
const { OpenaiMiddleware } = require('../middleware/openai.middleware')
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)
const prompt = `Assistant`

router.post('/', OpenaiMiddleware, async (req, res) => {
  const { userName, strength, opportunity } = req.body
  const requestMessages = [
    {
      role: 'user',
      content: `Crear un feedback para una evaluación de desempeño para ${userName}, su principal fortaleza ${strength} y una oportunidad de mejora ${opportunity}.`,
    },
  ]

  try {
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }, ...requestMessages],
      temperature: 0.6,
    }
    const completion = await openai.createChatCompletion(apiRequestBody)
    res.json(completion.data.choices[0].message.content)
  } catch (error) {
    if (error instanceof Error) console.log(error.toJSON())
    res.status(500).send('Something went wrong')
  }
})

module.exports = router
