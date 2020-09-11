const router = require('express').Router();

// require the model for movies to query to database
const Movie = require('./../models/Movie');



// Router Level Middleware
router.use((req, res, next) => {
	console.log(req.method + " " + req.originalUrl + " " + new Date(Date.now()))
	next();
})



// index
router.get('/', (req, res, next) => {

	Movie.find()
		.then(movies => res.send(movies))
		.catch(next);
});


// view single
router.get('/:id', (req, res, next) => {
	Movie.findById(req.params.id)
		.then(movie => res.send(movie))
		.catch(next);
});


// create
router.post('/', 
// 	passport.authenticate('jwt', {session: false}),
// 	adminOnly, 
// 	upload.single('image'), 
	(req, res, next) => {

// 	req.body.image = "public/" + req.file.filename

	Movie.create(req.body)
	 .then(movie => res.json(movie))
	 .catch(next);
});


module.exports = router
