const { Router } = require("express");
const router = Router();

const { User } = require("../models/user.model");
const { auth, isAdmin, isUser } = require("../middleware/auth");

// GET USER STATS
// router.get("/status", async (req, res) => {
//     const previousMonth =
// })

module.exports = router;
