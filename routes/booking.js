const router = require('express').Router();
const Movie = require('./../models/Movie');

router.post('/', (req,res,next) => {

	const arrayOfIds = req.body.bookings.map( booking => {
		return booking.movieId
	})


	Movie.find({ _id : { $in: arrayOfIds} })
	.then( movies => {
		let total = 0
		let bookingListSummary = movies.map( movie => {
			let matchedMovie = {};
			req.body.bookings.forEach( booking => {
				if (booking.movieId == movie._id) {
					matchedMovie = {
						movieId: movie._id,
						price: movie.price,
						name: movie.name,
						quantity : booking.quantity,
						subtotal : booking.quantity * movie.price
					}
					total += matchedMovie.subtotal;
				}
			})
			return matchedMovie;
			
		})
		res.send({ bookings : bookingListSummary, total });

	})
})

module.exports = router;
