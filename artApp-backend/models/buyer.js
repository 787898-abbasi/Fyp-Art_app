const mongoose = require('mongoose');

const buyerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  zip: {
    type: String,
  },
  phone: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
});

buyerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

buyerSchema.set('toJSON', {
  virtuals: true,
});

exports.Buyer = mongoose.model('Buyer', buyerSchema);
