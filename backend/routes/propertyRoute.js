// Add Property (Authenticated User)
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
  // Extract the token from the request headers
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1];

  console.log('Token:', token); // Log the extracted token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded:', decoded); // Log the decoded object


    // Set the authenticated user on the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
router.post('/add', authenticateUser, async (req, res) => {
  try {
    const { title, name, imageUrl, category, isForRent, price, isOfferAvailable, address, latitude, longitude } = req.body;

    // Create new property
    const newProperty = new Property({
      title,
      name,
      imageUrl,
      category,
      isForRent,
      price,
      isOfferAvailable,
      address,
      latitude,
      longitude
    });

    // Save the property to the database
    await newProperty.save();

    // Associate the property with the authenticated user
    req.user.properties.push(newProperty);
    await req.user.save();

    return res.status(201).json({ message: 'Property added successfully' });
  } catch (error) {
    console.error('Error while adding property:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



// router.post('/add', authenticateUser, async (req, res) => {
//   try {
//     const { title, name, imageUrl, category, isForRent, price, isOfferAvailable } = req.body;

//     // Create new property
//     const newProperty = new Property({
//       title,
//       name,
//       imageUrl,
//       category,
//       isForRent,
//       price,
//       isOfferAvailable,
//     });

//     // Save the property to the database
//     await newProperty.save();

//     // Associate the property with the authenticated user
//     const userId = req.user.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     user.properties.push(newProperty);
//     await user.save();

//     return res.status(201).json({ message: 'Property added successfully' });
//   } catch (error) {
//     console.error('Error while adding property:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });



  //     return res.status(201).json({ message: 'Property added successfully' });
  //   } catch (error) {
  //     console.error('Error while adding property:', error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // });
  

 
  // });
  router.delete('/delete/:id',authenticateUser, async (req, res) => {
    try {
      const propertyId = req.params.id;
  
      // Validate propertyId
      if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json({ message: 'Invalid property ID' });
      }
  
      // Find the property by ID and delete it
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
  
      if (!deletedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Remove the property from the authenticated user's properties
      console.log(req.user);
      const user = req.user;
      user.properties.pull(propertyId);
      await user.save();
  
      return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error while deleting property:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/properties/:userId', authenticateUser, async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user by their ID and populate the properties field
      const user = await User.findById(userId).populate('properties');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const properties = user.properties;
  
      return res.status(200).json({ properties });
    } catch (error) {
      console.error('Error while retrieving properties:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  //get all properties

// router.get('/properties', async (req, res) => {
//   try {
//     // Retrieve all properties
//     const properties = await Property.find();

//     return res.status(200).json({ properties });
//   } catch (error) {
//     console.error('Error while retrieving properties:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });
//get allproperties with query params

router.get('/properties', async (req, res) => {
  try {
    const { sortBy, sortOrder, isForRent, isForSell } = req.query;

    // Construct the filter object based on provided filter values
    const filter = {};
    if (isForRent) {
      filter.isForRent = isForRent === 'true'; // Convert string to boolean for rent filter
    }
    if (isForSell) {
      filter.isForRent = isForSell === 'false'; // Convert string to boolean and negate for sell filter
    }

    // Retrieve properties and apply filtering and sorting if provided
    let query = Property.find(filter);
    if (sortBy && sortOrder) {
      query = query.sort({ [sortBy]: sortOrder });
    }

    const properties = await query.exec();

    return res.status(200).json({ properties });
  } catch (error) {
    console.error('Error while retrieving properties:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//get all poperties with authenticated user
router.get('/properties', authenticateUser, async (req, res) => {
  try {
    const { sortBy, sortOrder, isForRent, isForSell } = req.query;
    const userId = req.user.userId;

    // Construct the filter object based on provided filter values and user ID
    const filter = { user: userId };
    if (isForRent) {
      filter.isForRent = isForRent === 'true'; // Convert string to boolean for rent filter
    }
    if (isForSell) {
      filter.isForRent = isForSell === 'false'; // Convert string to boolean and negate for sell filter
    }

    // Retrieve properties and apply filtering and sorting if provided
    let query = Property.find(filter);
    if (sortBy && sortOrder) {
      query = query.sort({ [sortBy]: sortOrder });
    }

    const properties = await query.exec();

    return res.status(200).json({ properties });
  } catch (error) {
    console.error('Error while retrieving properties:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


  module.exports = router;
