const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  carCompanies: [{ company: String, model: String }], // Store objects
  bikeCompanies: [{ company: String, model: String }], // Store objects
  numberoftv: { type: String, default: '' },
  acTons: { type: String, default: '' },
  numberOfAc: { type: Number, default: 0 },
  numberOfFans: { type: Number, default: 0 },
  numberOfLights: { type: Number, default: 0 },
  connectedDevices: { type: [String], default: [] },
});

module.exports = mongoose.model('Profile', profileSchema);
