import mongoose from "mongoose";
import ClickSchema from "./clickModel.js";
import TargetSchema from "./targetModel.js";
const LinkSchema = mongoose.Schema({
    originalUrl: {
    type: String,
    required: true,
  },
  clicks:[ClickSchema.schema],
  targetParamName: {
    type:String,
    default:"t"
  },
  targetValues: [TargetSchema.schema]
});

export default mongoose.model("links", LinkSchema);
