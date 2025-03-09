const express = require("express");
const User = require("../models/User"); // Ensure your User model is correctly imported

const router = express.Router();

// Get user details by _id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password if stored
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});
module.exports = router;

