const express = require('express')
const connectToMongo = require('./db')
const route = require('./routes/route')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

connectToMongo()

app.use('/', route)

app.listen(port, () => {
    console.log(`iNotebook Backend App Running at http://localhost:${port}`);
})