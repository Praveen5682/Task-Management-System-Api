const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const team = mongoose.model("team", teamSchema);

module.exports = team;
