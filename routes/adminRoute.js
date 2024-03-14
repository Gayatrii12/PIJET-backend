const express = require("express");
const router = express.Router();

const { getSub } = require("../controllers/adminController");

router.get("/getsub", getSub);
