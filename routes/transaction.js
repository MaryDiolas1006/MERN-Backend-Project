const router = require('express').Router();

const Transaction = require('./../models/Transaction');
const passport = require('passport')
const Movie = require('./../models/Movie');

const authenticate = passport.authenticate('jwt', {session: false});

router.get('/', authenticate, (req,res, next) => {
	let filter = {}
	if(!req.user.isAdmin){
		filter = {customerId: req.user._id}
	}

	Transaction.find(filter)
	.populate('customerId', ["email", 'fullname'])
	.populate('bookings.movieId', ['name', 'image', 'description']) 
	.then(transactions => {
		res.json(transactions)
	})
	.catch(next)
})

router.get('/:id', authenticate, (req, res, next) => {
	let filter = {_id: req.params.id}

	if(!req.user.IsAdmin){
		filter = {
			...filter,
			customerId: req.user._id
		}
	}

	Transaction.findById(filter)
	.populate('customerId', ["email", 'fullname'])
	.populate('bookings.movieId', ['name', 'image', 'description']) 
	.then(transaction => {
		if(transaction){
			res.send(transaction)
		}else{
			res.status(403).send('Unauthorize')
		}
	})
	.catch(next)
})

router.post('/', authenticate, (req,res,next)=>{
	
	let customerId = req.user._id
	

	const arrayOfIds = req.body.bookings.map( booking => {
		return booking.movieId
	})


	Movie.find({ _id : { $in: arrayOfIds} })
	.then( movies => {
		console.log("movie = ", movies)
		let total = 0
		let bookingListSummary = movies.map( movie => {
			let matchedMovie = {};
			req.body.bookings.forEach( booking => {
				// console.log(" b id = ", typeof booking.movieId )
				// console.log(" m id = ", typeof movie._id )
				// console.log(" b id = ", booking.movieId )
				// console.log(" m id = ", movie._id )
				// let a = movie._id.toString()
				// console.log(typeof a)
				// console.log(a)

				if (booking.movieId === movie._id.toString()) {
					console.log("matchedID = ",booking.movieId )
					matchedMovie = {
						movieId: movie._id,
						price: movie.price,
						name: movie.name,
						quantity : booking.quantity,
						subtotal : booking.quantity * movie.price,
						date: booking.date
					}
					total += matchedMovie.subtotal;
				}
			})
			return matchedMovie;
			
		})
		Transaction.create({ 
			customerId,
			bookings : bookingListSummary, 
			total 
		})
.then(transaction => {
	res.send(transaction)
})
.catch(next);

	})

})

router.put('/:id', authenticate, (req, res, next) => {
	req.user.isAdmin ? next() : res.status(403).send('Unauthorize')
}, (req, res, next) => {
	Transaction.findByIdAndUpdate(
			req.params.id,
			{ isComplete: req.body.isComplete },
			{new: true}
		)
	.then(transaction => res.send(transaction))
	.catch(next)
})


module.exports = router;
