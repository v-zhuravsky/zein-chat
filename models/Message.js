const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
	user: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
})

//Create collection and add schema
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message