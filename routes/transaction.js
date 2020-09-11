// const router = require('express').Router();

// const Transaction = require('./../models/Transaction');
// const passport = require('passport')
// const Movie = require('./../models/Movie');

// const authenticate = passport.authenticate('jwt', {session: false});

// router.get('/', authenticate, (req,res, next) => {
// 	let filter = {}
// 	if(!req.user.isAdmin){
// 		filter = {customerId: req.user._id}
// 	}

// 	Transaction.find(filter)
// 	.populate('customerId', ["email", 'fullname'])
// 	.populate('bookings.movieId', ['name', 'image', 'description']) 
// 	.then(transactions => {
// 		res.json(transactions)
// 	})
// 	.catch(next)
// })

// router.get('/:id', authenticate, (req, res, next) => {
// 	let filter = {_id: req.params.id}

// 	if(!req.user.IsAdmin){
// 		filter = {
// 			...filter,
// 			custometId: req.user._id
// 		}
// 	}

// 	Transaction.findById(filter)
// 	.populate('customerId', ["email", 'fullname'])
// 	.populate('orders.productId', ['name', 'image', 'description']) 
// 	.then(transaction => {
// 		if(transaction){
// 			res.send(transaction)
// 		}else{
// 			res.status(403).send('Unauthorize')
// 		}
// 	})
// 	.catch(next)
// })

// router.post('/', authenticate, (req,res,next)=>{
	
// 	let customerId = req.user._id
	

// 	const arrayOfIds = req.body.orders.map( order => {
// 		return order.productId
// 	})

// 	// console.log(arrayOfIds)

// 	Product.find({ _id : { $in: arrayOfIds} })
// 	.then( products => {
// 		let total = 0
// 		let orderListSummary = products.map( product => {
// 			let matchedProduct = {};
// 			req.body.orders.forEach( order => {
// 				if (order.productId == product._id) {
// 					matchedProduct = {
// 						// ...product,
// 						productId: product._id,
// 						price: product.price,
// 						name: product.name,
// 						quantity : order.quantity,
// 						subtotal : order.quantity * product.price
// 					}
// 					total += matchedProduct.subtotal;
// 				}
// 			})
// 			return matchedProduct;
			
// 		})
// 		Transaction.create({ 
// 			customerId,
// 			orders : orderListSummary, 
// 			total 
// 		})
// .then(transaction => {
// 	res.send(transaction)
// })
// .catch(next);

// 	})

// })

// router.put('/:id', authenticate, (req, res, next) => {
// 	req.user.isAdmin ? next() : res.status(403).send('Unauthorize')
// }, (req, res, next) => {
// 	Transaction.findByIdAndUpdate(
// 			req.params.id,
// 			{ isComplete: req.body.isComplete },
// 			{new: true}
// 		)
// 	.then(transaction => res.send(transaction))
// 	.catch(next)
// })


// module.exports = router;
