const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  roomId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
