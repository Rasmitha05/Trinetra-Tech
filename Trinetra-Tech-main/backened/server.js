const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000; // Set the port, default is 3000
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const authRoute = require('./routes/authRouter');
const Profile = require('./models/profile');
const User = require('./models/user');
const CarbonEmission = require('./models/emission');
const {verifyJWT} = require('./utils/tokenUtils');
// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests only from your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
};
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);
// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/Carbon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Create Profile
app.post('/create-profile', async (req, res) => {
  try {
    const { token, profile } = req.body;

    // Verify and decode the token
    const decoded = verifyJWT(token);
    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const email = decoded.email; // Extract email from token

    // Check if profile already exists
    let existingProfile = await Profile.findOne({ email });

    if (existingProfile) {
      // Update existing profile
      existingProfile = await Profile.findOneAndUpdate(
        { email },
        { $set: { profile } },
        { new: true }
      );
    } else {
      // Create new profile
      existingProfile = new Profile({ email, profile });
      await existingProfile.save();
    }

    res.status(200).json({
      message: 'Profile saved successfully!',
      profile: existingProfile,
    });
  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ error: 'Failed to save profile.' });
  }
});
app.get('/leaderboard', async (req, res) => {
  try {
    const users = await CarbonEmission.find({
      Totalemission: { $exists: true },
    })
      .sort({ Totalemission: 1 }) // Sort in ascending order (lower emissions first)
      .limit(100)
      .select('email Totalemission'); // Only select email and totalEmission fields

    res.status(200).json(users);
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Fetch device data after OAuth
app.post('/fetch-device-data', async (req, res) => {
  const { code, provider } = req.body;

  try {
    // Simulate fetching device data from the provider
    const deviceData = {
      provider,
      type: 'car', // Example: Tesla car
      usage: 100, // Example: 100 kWh
      runtime: 5, // Example: 5 hours
    };

    // Update the profile with the new device data
    const profile = await Profile.findOne({ email: req.user.email });
    if (profile) {
      profile.connectedDevices.push(deviceData);
      await profile.save();
    }

    res
      .status(200)
      .json({ message: 'Device data fetched successfully!', deviceData });
  } catch (err) {
    console.error('Error fetching device data:', err);
    res.status(500).json({ error: 'Failed to fetch device data.' });
  }
});
app.post('/get-profile', async (req, res) => {
  try {
    const { token } = req.body;

    // Verify and decode the token
    const decoded = verifyJWT(token);
    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const email = decoded.email; // Extract email from token

    // Find profile using email
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.json({ profile });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/save-carbon-data', async (req, res) => {
  try {
    const {
      token,
      profile,
      flightData,
      hotelData,
      ecommerceData,
      freightData,
      electricityData,
      fuelData,
      Totalemission,
    } = req.body;
 // get the email
 const decoded = verifyJWT(token);
    if (!decoded || !decoded.email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid or expired token' });
    }

    // Extract email from token
    const email = decoded.email;
    // Save the data to the database
    const carbonData = new CarbonEmission({
      email,
      profile,
      flightData,
      hotelData,
      ecommerceData,
      freightData,
      electricityData,
      fuelData,
      Totalemission,
    });
    console.log(carbonData);
    await carbonData.save();
    res.status(200).json({ message: 'Carbon data saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save carbon data.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
