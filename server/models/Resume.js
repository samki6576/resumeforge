const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'My Resume' },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        portfolio: String,
        summary: String
    },
    experience: [{
        title: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        bulletPoints: [String]
    }],
    education: [{
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        gpa: String
    }],
    skills: [{ category: String, skills: [String] }],
    template: { type: String, default: 'modern' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
