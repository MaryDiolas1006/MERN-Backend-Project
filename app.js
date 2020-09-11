const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// initialize the application using express
const app = express();

// declare what port will be use by the application
const port = process.env.PORT || 5000


const movies = require('./routes/movie');
const users = require('./routes/user');
const transactions = require('./routes/transaction');
const bookings = require('./routes/booking');
require('dotenv').config();



// connect to database using mongoose
// mongoose.connect('mongodb://localhost:27017/movies', {
mongoose.connect(process.env.ATLAS, {
	useNewUrlParser: true, 
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});


// check if the connection is successful
mongoose.connection.on('connected', () => {
	console.log('Connected to database')
});


// // Route Middleware

// // application level middleware
app.use((req, res, next) => {
	// this will show what method is requesting ex:post, put delete and get
	console.log(req.method);
	next();
});


// // parse incoming request body to json format
// // this will create body attribute to request object
app.use(express.json());
app.use(cors());

// // serve a static file
app.use('/public', express.static('assets/images'))

app.use('/movies', movies);
app.use('/users', users);

app.use('/transactions', transactions);
app.use('/bookings', bookings);



app.get('/', (req, res,) => {
	res.send({
		message: "App is running"
	})
});


// Error handling middleware
app.use((err, req, res, next) => {
	res.status(400).send({
		error: err.message
	})
});


// this will run the application on the desired port
app.listen(port, () => {
	console.log(`App is listening at port ${port}`)
});
