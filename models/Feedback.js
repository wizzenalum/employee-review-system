const { Schema, model } = require("mongoose");

// creating the schema
const feedbackSchema = new Schema(
  {
    feedbackBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    feedbackFor: {
      type: Schema.Types.ObjectId,
      ref: "Performance",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// creating model from the schema
const Feedback = model("Feedback", feedbackSchema);
module.exports = Feedback;
