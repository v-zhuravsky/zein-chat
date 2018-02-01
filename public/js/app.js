const form = document.querySelector('.chat-form')

form.addEventListener('submit', event => {
	const user = document.querySelector('.user').value
	let message = document.querySelector('.message')

	const data = {user: user, message: message.value}

	fetch('http://youdomain/chat', {
		method: 'post',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(res => res.json()).then(data => {
		console.log(data)
		message.value = ''
	}).catch(err => console.log(err))

	event.preventDefault()
})

var messagesList = document.querySelector('.messages-list')

fetch('http://yourdomain/chat').then(res => res.json()).then(data => {
	let messages = data.messages.map(message => '<li><span>' + message.user + '</span>' + message.message + '</li>')
	messagesList.innerHTML += messages
})

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true

var pusher = new Pusher('your_public_pusher_key', {
	cluster: 'your_cluster',
	encrypted: true
})

var channel = pusher.subscribe('chat');
channel.bind('chat-add-message', function(data) {
	messagesList.innerHTML += '<li><span>' + data.user + '</span>' + data.message + '</li>'
})