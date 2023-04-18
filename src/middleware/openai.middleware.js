const GPT3TokenizerImport = require('gpt3-tokenizer')
const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv')

dotenv.config()

const prompt = `Assistant`
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const GPT3Tokenizer =
  typeof GPT3TokenizerImport === 'function'
    ? GPT3TokenizerImport
    : GPT3TokenizerImport.default

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

function getTokens(input) {
  const tokens = tokenizer.encode(input)
  return tokens.text.length
}

const OpenaiMiddleware = async (req, res, next) => {
  // const requestMessages = req.body.messages
  const requestMessages = [
    {
      role: 'user',
      content:
        'Crear un feedback para una evaluación de desempeño para Juan Pérez, su principal fortaleza es su eficiencia y una oportunidad de mejora es la puntualidad.',
    },
  ]

  try {
    let tokenCount = 0
    requestMessages.forEach((msg) => (tokenCount += getTokens(msg.content)))
    const input = requestMessages[requestMessages.length - 1].content
    const moderationResponse = await openai.createModeration({ input })
    const flagged = moderationResponse.data.results[0]?.flagged
    if (flagged) return res.status(400).send('Message is inappropriate')

    tokenCount += getTokens(prompt)
    if (tokenCount > 4000) return res.status(400).send('Message is too long')
    next()
  } catch (error) {
    console.log('error:', error)
    res.status(500).send('Something went wrong')
  }
}

module.exports = { OpenaiMiddleware }
