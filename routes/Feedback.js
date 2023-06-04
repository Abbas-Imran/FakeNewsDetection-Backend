const express = require("express");
const router = express.Router();
const feedbackModel = require("../models/Feedback");
const asyncWrapper = require("../middleware/async");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { text, status, username } = req.body;

    let feedback = new feedbackModel({ text, status, username });

    await feedback.save();

    res.send({ text, status, username });
  })
);
module.exports = router;