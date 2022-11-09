import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    image:{type: String},
    title: {
        type: String,
        required: [true, "A user must have an email"],
        trim: true,
        lowercase: true
    },
    description: {type: String, required : true},
    email: {type: String, required : true}
})

export default mongoose.model("TodoModel", todoSchema)
