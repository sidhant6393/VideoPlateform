const mongoose = require('mongoose');

const overlaySchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Overlay = mongoose.model('Overlay', overlaySchema);

module.exports = Overlay;
