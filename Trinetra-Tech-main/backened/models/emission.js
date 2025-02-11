const mongoose = require('mongoose');

// Define the schema for the user's profile
const ProfileSchema = new mongoose.Schema({
  numberOfAc: { type: Number, default: 0 },
  numberOfFans: { type: Number, default: 0 },
  numberOfLights: { type: Number, default: 0 },
  approxWaterUsage: { type: Number, default: 0 },
  smartDevices: { type: Object, default: {} },
});

// Define the schema for flight data
const FlightDataSchema = new mongoose.Schema({
  iata_airport_from: { type: String, },
  iata_airport_to: { type: String, },
  flight_class: { type: String, },
  round_trip: { type: Boolean, },
});

// Define the schema for hotel data
const HotelDataSchema = new mongoose.Schema({
  country_code: { type: String, },
  city_name: { type: String, },
  number_of_nights: { type: Number, },
  number_of_rooms: { type: Number, },
});

// Define the schema for e-commerce data
const EcommerceDataSchema = new mongoose.Schema({
  origin_country_code: { type: String, },
  destination_country_code: { type: String,  },
  origin_postal_code: { type: String,  },
  destination_postal_code: { type: String,  },
  package_weight: { type: Number,  },
});

// Define the schema for freight data
const FreightDataSchema = new mongoose.Schema({
  transport_mode: { type: String,  },
  freight_weight: { type: Number, },
  distance_value: { type: Number, },
});

// Define the schema for electricity data
const ElectricityDataSchema = new mongoose.Schema({
  country_name: { type: String, },
  electricity_value: { type: Number,  },
  electricity_unit: { type: String, },
});

// Define the schema for fuel data
const FuelDataSchema = new mongoose.Schema({
  fuel_usage: { type: Number, },
  fuel_name: { type: String, },
  fuel_value: { type: Number,},
});

// Define the main schema for carbon emission data
const CarbonEmissionSchema = new mongoose.Schema({
  email: { type: String}, // User's email
  profile: { type: ProfileSchema, }, // User's profile data
  flightData: { type: FlightDataSchema}, // Flight data
  hotelData: { type: HotelDataSchema,}, // Hotel data
  ecommerceData: { type: EcommerceDataSchema, }, // E-commerce data
  freightData: { type: FreightDataSchema}, // Freight data
  electricityData: { type: ElectricityDataSchema,  }, // Electricity data
  fuelData: { type: FuelDataSchema,}, // Fuel data
  Totalemission:{type:Number},
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create the model
const CarbonEmission = mongoose.model('CarbonEmission', CarbonEmissionSchema);

module.exports = CarbonEmission;
