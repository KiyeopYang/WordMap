import mongoose from 'mongoose';

const { Schema } = mongoose;
const Person = new Schema({
  phone: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
});

const model = mongoose.model('person', Person);

export default model;
