const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

//DB Config
require('./config/db')

const app = express()

const chat = require('./routes/chat')

//Set public folder
app.use(express.static(path.join(__dirname + '/public')))

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Enable CORS
app.use(cors())

app.use('/chat', chat)

const port = 3000

// Start server
app.listen(port, () => {
	console.log('Listening at port :' + port)
})