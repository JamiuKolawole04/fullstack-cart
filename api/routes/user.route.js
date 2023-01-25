const { Router } = require("express");
const moment = require("moment");
const router = Router();

const { User } = require("../models/user.model");
const { auth, isAdmin, isUser } = require("../middleware/auth");

console.log(moment());
console.log(
  moment()
    .year(moment().year() - 1)
    .fromNow()
);

// GET USER STATS
router.get("/stats", async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  res.status(200).json({
    success: true,
    message: previousMonth,
  });
});

module.exports = router;
