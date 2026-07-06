const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

router.post('/', auth, async (req, res) => {
    try {
        const resume = new Resume({ ...req.body, user: req.user._id });
        await resume.save();
        res.json({ success: true, resume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id });
        res.json({ success: true, resumes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
        res.json({ success: true, resume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
        res.json({ success: true, resume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.json({ success: true, message: 'Resume deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
