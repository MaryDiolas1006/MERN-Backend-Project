const router = require('express').Router();

// require the model for movies to query to database
const Movie = require('./../models/Movie');

const multer = require('multer');

const passport = require('passport');


// set multer settings for uploading images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/images')
  },
  filename: function (req, file, cb) {
  	// console.log(file);
    cb(null, Date.now() + "-" + file.originalname)
  }
})
 
const upload = multer({ storage: storage })

const adminOnly = (req, res, next) => {
	// console.log(req.user.isAdmin);
	if (req.user.isAdmin){
		next();
	}else{
		res.status(403).send({
			error: "Forbidden"
		})
	}
}


const authenticate =  passport.authenticate('jwt', {session: false});



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
	authenticate,
	adminOnly, 
	upload.single('image'), 
	(req, res, next) => {

	req.body.image = "public/" + req.file.filename

	Movie.create(req.body)
	 .then(movie => res.json(movie))
	 .catch(next);
});


// update
router.put('/:id',
	authenticate,
	adminOnly,
	upload.single('image'), 
	(req, res, next) => {

	if(req.file){
		req.body.image = "public/" + req.file.filename
	}
	Movie.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
		)
		.then(movie => res.send(movie))
		.catch(next);
});


// delete
router.delete('/:id',
 authenticate,
 adminOnly,
 (req, res, next) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(movie => res.send({
			movie,
			message: "Movie is successfully deleted"
		}))
		.catch(next)
});

module.exports = router
