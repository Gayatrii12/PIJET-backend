const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/multer');
const { uploadPaper } = require('../controllers/uploadPaper');
router.post('/', upload ,uploadPaper);

module.exports = router;