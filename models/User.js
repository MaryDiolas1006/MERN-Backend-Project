const mongoose = require('mongoose');

const {Schema} = mongoose;


const UserSchema = new Schema({
	fullname: {
		type: String,
		required: [true, "Name field required"]
	},

	email: {
		type: String,
		required: [true, "Email field required"],
		unique: true
	},

	password: {
		type: String,
		required: [true, "Password field is required"],
		minlength: [8, "Password should be at least 8 characters"]
	},

	isAdmin: {
		type: Boolean,
		default: 0
	},
},{
	timestamps: true
})


module.exports = mongoose.model('User', UserSchema);