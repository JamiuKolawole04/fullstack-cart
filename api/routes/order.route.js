const { Router } = require("express");
const moment = require("moment");
const router = Router();

const { Order } = require("../models/order.model");
const { auth, isAdmin, isUser } = require("../middleware/auth");

// GET ORDER STATS
router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const orders = await Order.aggregate([
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
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err,
    });
  }
});

// GET INCOME STATS
router.get("/income/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "stats fetched successfully",
      income,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err,
    });
  }
});

module.exports = router;
