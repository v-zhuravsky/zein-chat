const express = require('express')
const router = express.Router()
const mogoose = require('mongoose')

const Message = require('../models/Message')

const Pusher = require('pusher')

var pusher = new Pusher({
	appId: 'your_appID',
	key: 'your_key',
	secret: 'your_secret_key',
	cluster: 'your_cluster',
	encrypted: true
})

router.get('/', (req, res) => {
	Message.find().then(messages => {
		res.json({success: true, messages: messages})
	})
})

router.post('/', (req, res) => {
	const newMessage = {
		user: req.body.user,
		message: req.body.message
	}

	new Message(newMessage).save().then(message => {
		pusher.trigger('chat', 'chat-add-message', {
			message: message.message,
			user: message.user
		})

		return res.json({success: true, message: req.body.message})
	})
})

module.exports = router;