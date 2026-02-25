const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// Get all certifications
router.get('/', async (req, res) => {
    try {
        const certs = await Certification.find().sort({ date: -1 });
        res.json(certs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create certification
router.post('/', async (req, res) => {
    try {
        const cert = new Certification(req.body);
        const saved = await cert.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update certification
router.put('/:id', async (req, res) => {
    try {
        const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete certification
router.delete('/:id', async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Certification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
