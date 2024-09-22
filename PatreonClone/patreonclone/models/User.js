import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userschema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  pfp: {
    data: Buffer,
    contentType: String
  },
  coverimg: {
    data: Buffer,
    contentType: String
  },
  createdate: { type: Date, default: Date.now },
  updatedate: { type: Date, default: Date.now }
});

export default mongoose.models.User || model('User', userschema);
