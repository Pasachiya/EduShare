const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  division: { type: String, required: true },
  subject: { type: String, required: true },
  materialType: { type: String, required: true },
  tags: [String],
  downloads: { type: Number, default: 0 },
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);