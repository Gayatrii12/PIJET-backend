const express = require("express");
const router = express.Router();
const {adminSignUp, adminLogin} = require("../controllers/adminController");

const { getAllSubmissions, getPaperById } = require("../controllers/adminSubmissionFetching");

router.get("/getallsubmissions", getAllSubmissions);
router.get("/getpaperbyid", getPaperById);
router.get("/signup", adminSignUp);
router.get("/login", adminLogin);
module.exports = router;