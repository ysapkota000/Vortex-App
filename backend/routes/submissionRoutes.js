const express = require('express');
const router = express.Router();

const {
    getSubmissions,
    addSubmission
} = require('../controllers/submissionController');

router.get('/', getSubmissions);
router.post('/', addSubmission);

module.exports = router;