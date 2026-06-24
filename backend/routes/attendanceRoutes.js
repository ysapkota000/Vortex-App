const express = require('express');
const router = express.Router();

const {
    getAttendance,
    addAttendance
} = require('../controllers/attendanceController');

router.get('/', getAttendance);
router.post('/', addAttendance);

module.exports = router;