const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)
const prompt = `Assistant`

const feedbackSuggest = async (req, res) => {
  try {
    const { userName, strength, opportunity } = req.body
    const requestMessages = [
      {
        role: 'user',
        content: `Crear un feedback para una evaluación de desempeño para ${userName}, su principal fortaleza ${strength} y una oportunidad de mejora ${opportunity}.`,
      },
    ]
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
}

module.exports = { feedbackSuggest }
