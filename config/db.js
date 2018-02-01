const mongoose = require('mongoose')

//Map global promises
mongoose.Promise = global.Promise

//Mongoose connect
mongoose.connect('<your_connection_params>').then(() => {
	console.log('MongoDB connected.')
}).catch(err => console.log(err))