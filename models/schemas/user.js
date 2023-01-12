import { Schema, model, models } from "mongoose";
import shortid from "shortid";

const userSchama = new Schema({
  // shortid: shortid.generate(),
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchama);

export default User;
