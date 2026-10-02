import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required :[true ,"token is required to be added in blcklisting"]
    },
},

    { timestamps :true
    
})
const tokenBlcklistModel = mongoose.model("blcklistTokens",blacklistTokenSchema);

export default tokenBlcklistModel;