const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create Note
router.post('/', async (req, res) => {
  const { title, content, roomId } = req.body;
  try {
    const note = new Note({ title, content, roomId });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Note by Room ID
router.get('/:roomId', async (req, res) => {
  try {
    const note = await Note.findOne({ roomId: req.params.roomId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
