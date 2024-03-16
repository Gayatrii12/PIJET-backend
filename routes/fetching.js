const express = require('express');
const router = express.Router();
const {getAllSubmissions, getPaperById} = require('../controllers/adminSubmissionFetching');
router.get('/papers/download',getPaperById);
router.get('/papers',getAllSubmissions);    
module.exports = router;