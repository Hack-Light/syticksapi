const jwt = require('jsonwebtoken'),
	bcryptjs = require('bcrypt'),
	User = require('../models/user'),
	{ signToken } = require('../auth/auth');

exports.registerUser = async (req, res, next) => {
	let { phone, password, role, username, name, email, day, month, year } =
		req.body;
	console.log(req.body);

	try {
		let user = await User.findOne({
			$or: [
				{ email: { $regex: email, $options: 'i' } },
				{ username: { $regex: username, $options: 'i' } },
			],
		});
		if (user) {
			return res.status(409).json({
				success: false,
				message: 'User already exists',
				error: {
					statusCode: 409,
					description: 'User already taken, please check your details.',
				},
			});
		}
		let hashpassword = await bcryptjs.hash(password, 12);
		let user_role = role || 'user';
		let api_token = jwt.sign(
			{
				phone_number: phone,
				role: user_role,
				email,
				username,
			},
			process.env.JWT_KEY,
			{
				expiresIn: '24h',
			},
		);

		user = new User({
			phone: phone,
			password: hashpassword,
			api_token: api_token,
			role: user_role,
			email,
			username,
			name,
			day,
			month,
			year,
		});
		user = await user.save();

		return res.status(201).json({
			success: true,
			message: 'User registration successfully',
			id: user._id,
			phone: user.phone,
			email: user.email,
			username: user.username,
			name: user.name,
			api_key: user.api_token,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
			error: {
				statusCode: 500,
				description: err.message,
			},
		});
	}
};
