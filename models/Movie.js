const mongoose = require('mongoose');
const {Schema} = mongoose;


const MovieSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Name field is required']
	},

	price: {
		type: Number,
		required: [true, 'Price field is required'],
		min: 0.01
	},

	description: {
		type: String,
		required: [true, 'Description is required']
	},

	image: {
		type: String,
		required: [true, 'Image is required']
	},

},{
	timestamps: true
});


module.exports = mongoose.model('Movie', MovieSchema);