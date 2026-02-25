const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single project
router.get('/:slug', async (req, res) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create project
router.post('/', async (req, res) => {
    try {
        const { name, slug, description, content, imageUrl, category, technologies, liveUrl, githubUrl, date, featured } = req.body;
        
        const newProject = new Project({
            name,
            slug,
            description,
            content,
            imageUrl,
            category,
            technologies: technologies || [],
            liveUrl,
            githubUrl,
            date: date || new Date(),
            featured: featured || false
        });
        
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update project
router.put('/:id', async (req, res) => {
    try {
        const { name, slug, description, content, imageUrl, category, technologies, liveUrl, githubUrl, date, featured } = req.body;
        
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { name, slug, description, content, imageUrl, category, technologies, liveUrl, githubUrl, date, featured },
            { new: true, runValidators: true }
        );
        
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
