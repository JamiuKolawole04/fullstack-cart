const { Router } = require("express");
const moment = require("moment");
const bcrypt = require("bcrypt");
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

router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      nbHits: users.length,
      message: "users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
});

// GET A USER
router.get("/:id", isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
});

//UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!(user.email === req.body.email)) {
      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse) {
        res.status(409).json({
          success: false,
          message: "email already in use.",
        });
      }
    }

    if (req.body.password && user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "could not found this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "user deleted",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
});

module.exports = router;
