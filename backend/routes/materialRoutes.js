const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Upload a new material
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, division, subject, materialType, tags } = req.body;
    const material = new Material({
      title,
      description,
      fileUrl: req.file.path,
      userId: req.user.userId,
      division,
      subject,
      materialType,
      tags: tags.split(',').map(tag => tag.trim())
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: 'Upload failed', error: error.message });
  }
});

// Get all materials
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find().populate('userId', 'username');
    res.json(materials);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching materials', error: error.message });
  }
});

// Get a single material
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('userId', 'username');
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching material', error: error.message });
  }
});

// Update material
router.put('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    res.status(400).json({ message: 'Error updating material', error: error.message });
  }
});

// Delete material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting material', error: error.message });
  }
});

module.exports = router;