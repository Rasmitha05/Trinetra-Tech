const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const {
  NotFoundError,
  UnauthenticatedError,
} = require('../errors/customErrors.js');
const { createJWT } = require('../utils/tokenUtils.js');

const User = require('../models/user.js');

const createuser = async (req, res) => {
  try {
    let { email, username, password, country } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      country,
    });

    // Generate JWT Token
    const token = createJWT({ email });

    res.status(StatusCodes.CREATED).json({
      message: `${username} created successfully`,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Username or email already exists' });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    // Generate JWT token
    const token = createJWT({
      email: email,
    });

    res
      .status(StatusCodes.OK)
      .json({ msg: 'User logged in successfully', token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'User logged out successfully' });
};

module.exports = { createuser, login, logout };
