const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register a new user
const userSignup = async (req, res) => {
  try {
    let { username, email, phoneNo, password } = req.body;

    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();

    if (!(username && email && phoneNo && password)) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    } else if (!/^[a-zA-Z\s]*$/.test(username)) {
      return res
        .status(400)
        .json({ message: "Name must contain only letters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phoneNo,
      password: hashedPassword,
      username,
    });

    const createdUser = await newUser.save();

    res.status(200).json({
      message: "Account created successfully!",
      user: createdUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userSignup,
};
