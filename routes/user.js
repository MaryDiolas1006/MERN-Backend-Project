const router = require('express').Router()
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./../passport-setup');

const authenticate =  passport.authenticate('jwt', {session: false});

router.post('/register', (req, res, next) => {
	let {password, confirmPassword} = req.body

	if(password !== confirmPassword){
		return res.status(400).send({
			error: "Password and confrimPassword do not match. Password should at lest 8 characters"
		})
	}

	if(password.length < 8 ){
		return res.status(400).send({
			error: "Password should be at lest 8 characters"
		})
	}

	// this is will how many times to hash the password
	const saltRounds = 10;

	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			req.body.password = hash;

			User.create(req.body)
			.then(user => res.json(user))
			.catch(next);
		})
	})
})


router.post('/login', (req, res, next) => {

	// check if fields are not empty
	let {email, password} = req.body;

	if(!email || !password){
		return res.status(400).send({
			error: "Check credentials"
		})
	}
	// check the email if it is existing
	User.findOne({email})
	.then(user => {

		if(!user){
			return res.status(400).send({
				error: "Check credentials"
			})
		}else {

			// compare password given by user and hashed password in db
			// Load hash from your password DB.
			bcrypt.compare(password, user.password).then(function(result) {
           // result == true
           console.log(result);

           if (result) {
			// if comparing is successful
			// create a token then send user details

			let {_id, fullname, email, isAdmin} = user
			let token = jwt.sign({_id: user._id}, 'secret_key')

			res.send({
				message: "Login successful",
				token,
				user: {
					_id,
					fullname,
					email,
					isAdmin
				}
			})
           }else{
           	res.status(400).send({
           		error: "Check credentials"
           	})
           }
        });

		}
	})
})

router.get('/profile', 
	authenticate,
	(req, res, next) => {
	res.send(req.user);
})


module.exports = router