const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 8000
const app = express()
app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

app.get('/', async (req, res) => res.send('hola'))
app.use('/api/openai/', require('./routes/openai.route'))

app.listen(port, () => console.log(`go to: http://localhost:${port}`))
