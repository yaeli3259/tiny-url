
import mongoose from "mongoose";

const ClickSchema = mongoose.Schema({
        insertedAt: {
                type: Date,
                default: Date.now,
        },
        ipAddress: {type: String},
        targetParamValue: { type: String },
});
export default mongoose.model("clicks", ClickSchema);
