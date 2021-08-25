const jwt = require("jsonwebtoken"),
  bcryptjs = require("bcrypt"),
  User = require("../models/user"),
  { signToken } = require("../auth/auth");

exports.registerUser = async (req, res, next) => {
  let { phone, password, role, username, name, email,day , month, year } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        error: {
          statusCode: 409,
          description:
            "Phone number already taken, please use another phone number"
        }
      });
    }
    let hashpassword = await bcryptjs.hash(password, 12);
    let user_role = role || "user";
    let api_token = jwt.sign(
      {
        phone_number: phone,
        role: user_role,
        email,
        username
      },
      process.env.JWT_KEY,
      {
        expiresIn: "24h"
      }
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
      year
      
    });
    user = await user.save();
    

    return res.status(201).json({
      success: true,
      message: "User registration successfull",
      phone: user.phone,
      email: user.email,
      username: user.username,
    name: user.name,
      day: user.day,
      month: user.month,
    year: user.year
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: {
        statusCode: 500,
        description: err.message
      }
    });
  }
};
