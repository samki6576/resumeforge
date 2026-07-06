const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateBulletPoints, generateSummary, suggestSkills } = require('../controllers/aiController');

router.use(auth);
router.post('/generate-bullets', generateBulletPoints);
router.post('/generate-summary', generateSummary);
router.post('/suggest-skills', suggestSkills);

module.exports = router;
