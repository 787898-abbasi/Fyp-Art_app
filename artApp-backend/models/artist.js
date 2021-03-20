const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
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
});

artistSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

artistSchema.set('toJSON', {
  virtuals: true,
});

exports.Artist = mongoose.model('Artist', artistSchema);
