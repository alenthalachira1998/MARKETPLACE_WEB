/* eslint-disable no-undef */
// const express = require('express');
// const router = express.Router();
// const User = require('../models/userSchema');
// const bcrypt = require('bcrypt');

// // User registration route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Create new user
//     const newUser = new User({ username, password });
//     await newUser.save();

//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate password
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during user login:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });
//with email option

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/userSchema');

// // User registration route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if username or email already exists
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }

//     // Create new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user exists using username or email
//     const user = await User.findOne({
//       $or: [{ username }, { email }],
//     });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate password
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during user login:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;



// User registration route without bycript and with jwt token
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if username or email already exists
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }

//     // Create new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

//     return res.status(201).json({ message: 'User registered successfully', token });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user exists using username or email
//     const user = await User.findOne({
//       $or: [{ username }, { email }],
//     });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate password
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//     return res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error during user login:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
//with jwt

// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if username or email already exists
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user exists using username or email
//     const user = await User.findOne({
//       $or: [{ username }, { email: username }],
//     });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare the provided password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during user login:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });
// module.exports = router;

//with jwt scecret funtionality
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');
// JWT token validation middleware

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




// // function authenticateToken(req, res, next) {
// //   const authHeader = req.headers['authorization'];
// //   const token = authHeader && authHeader.split(' ')[1];
// //   if (!token) {
// //     return res.sendStatus(401);
// //   }

// //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) {
// //       return res.sendStatus(403);
// //     }

// //     req.user = decoded;
// //     next();
// //   });
//}

// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists using username or email
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const userId = user._id;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

   return res.status(200).json({ message: 'Login successful', token, userId });
    
  } catch (error) {
    console.error('Error during user login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//edit the authenticated user's username, password, and email, as well as delete the user account:

// Route to edit authenticated user's username, password, and email
router.put('/users', authenticateUser, async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userId = req.user.userId;

    // Find the authenticated user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's username, password, and email
    user.username = username;
    user.password = password;
    user.email = email;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error while updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete authenticated user account
router.delete('/users', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the authenticated user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user account
    await user.remove();

    return res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error while deleting user account:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


  