const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const PropertyRoutes = require('./routes/propertyRoute');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Protected route
// app.get('/protected-route', authenticateToken, (req, res) => {
//   const userId = req.user.userId;
//   // Do something with the user ID
//   res.send('Protected route accessed');
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) {
//     return res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = decoded; // Attach the decoded user object to req.user
//     next();
//   });
// }

app.use('/api', userRoutes);
app.use('/api', PropertyRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
