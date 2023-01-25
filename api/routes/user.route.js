const { Router } = require("express");
const moment = require("moment");
const router = Router();

const { User } = require("../models/user.model");
const { auth, isAdmin, isUser } = require("../middleware/auth");

// GET USER STATS
router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const users = await User.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "stats fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err,
    });
  }
});

module.exports = router;
