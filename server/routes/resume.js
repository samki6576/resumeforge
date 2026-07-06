const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

// Create resume
router.post('/', auth, async (req, res) => {
    try {
        const resume = new Resume({ ...req.body, user: req.user._id });
        await resume.save();
        res.json({ success: true, resume });
    } catch (error) {
        console.error('Create resume error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all resumes
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id });
        res.json({ success: true, resumes });
    } catch (error) {
        console.error('Get resumes error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        res.json({ success: true, resume });
    } catch (error) {
        console.error('Get resume error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }
        res.json({ success: true, resume });
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
    try {
        await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.json({ success: true, message: 'Resume deleted' });
    } catch (error) {
        console.error('Delete resume error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
