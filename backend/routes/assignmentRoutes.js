const express = require('express');
const router = express.Router();

const {
    getAssignments,
    addAssignment
} = require('../controllers/assignmentController');

router.get('/', getAssignments);
router.post('/', addAssignment);

module.exports = router;