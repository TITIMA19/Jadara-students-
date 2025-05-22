const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

// POST /api/register
router.post("/register", register);

module.exports = router;
