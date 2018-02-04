import mongoose from 'mongoose';

const { Schema } = mongoose;
const Client = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const model = mongoose.model('client', Client);

export default model;
