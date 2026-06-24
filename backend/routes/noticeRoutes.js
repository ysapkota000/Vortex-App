const express = require('express');
const router = express.Router();

const {
    getNotices,
    addNotice
} = require('../controllers/noticeController');

router.get('/', getNotices);
router.post('/', addNotice);

module.exports = router;