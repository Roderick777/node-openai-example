const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 8000
const app = express()
app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

app.get('/', async (req, res) => {
  res.send('hola')
})

app.use('/api/openai/', require('./routes/openai.route'))

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
