import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SchoolSchema = new Schema({
    npsn: {
        type: Number,
        unique: true,        
    },
  });
  

const School = model("School" , SchoolSchema);

export default School;
