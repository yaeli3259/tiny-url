import mongoose from "mongoose";
const TargetSchema =  mongoose.Schema({
            name:{
                type: String,
                default: "",
            },
            value:{
                type: String,
            }
})
export default mongoose.model("targets",TargetSchema);