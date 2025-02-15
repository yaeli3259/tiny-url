import mongoose from "mongoose";
import linkModel from "./linkModel.js";

const UserSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'links'
  }]
});

export default mongoose.model("users", UserSchema);
