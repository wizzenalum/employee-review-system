const { Schema, model } = require("mongoose");

// creating the schema
const userSchema = new Schema(
  {
    userType: {
      type:String,
      enum: ["admin", "employee"],
      required:true
    },
    isRequested:{
        type: Schema.Types.ObjectId,
        ref: "User",
        default:null
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department:{
      type:String,
      enum: ["HR", "Sales", "Production","Marketing"],
      required:true
    },
    joiningDate:{
      type:Date,
    },
    performanceList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Performance",
      },
    ],
    listToReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

  },
  {
    timestamps: true,
  }
);

// creating model from the schema
const User = model("User", userSchema);
module.exports = User;
