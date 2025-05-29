const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	username: {
		 type: String,
		  required: true,
		   unique: true },
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		// select: false
	},

	role: {
		type: String,	
		enum: ['user', 'admin'],
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
