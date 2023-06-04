const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  query: {
    type: String,
    unique: true, // Ensure uniqueness of the query field
    sparse: true, // Allow multiple null values for the query field
  },
  text: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
});

const feedbackModel = mongoose.model("feedback", FeedbackSchema);
module.exports = feedbackModel;