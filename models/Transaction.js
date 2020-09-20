const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required : [true, "Customer ID is required"]
	},
	total : {
		type: Number,
		required: [true, "Total should not be empty"],
		min: 0.01
	},
	isComplete: {
		type: Boolean,
		default: false
	},
			date: {
				type: Date,
				// required: [true, "Movie Date required"]
				default: Date.now
			},
	bookings: [
		{
			movieId : {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Movie'
			},
			quantity: {
				type: Number,
				required: [true, "Movie quantity required"]
			},
			price : {
				type: Number,
				required: [true, "Movie Price required"]
			},
			subtotal: {
				type: Number,
				required: [true, "Subtotal required"]
			},
		}
	]
},{timestamps: true})

module.exports = mongoose.model('Transaction', TransactionSchema);
