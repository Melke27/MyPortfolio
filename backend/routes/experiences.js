const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get all experiences
router.get('/', async (req, res) => {
    try {
        const exp = await Experience.find().sort({ order: 1, startDate: -1 });
        res.json(exp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create experience
router.post('/', async (req, res) => {
    try {
        const exp = new Experience(req.body);
        const saved = await exp.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update experience
router.put('/:id', async (req, res) => {
    try {
        const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete experience
router.delete('/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
