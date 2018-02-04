import mongoose from 'mongoose';

const { Schema } = mongoose;
const Word = new Schema({
  word: {
    type: String,
    index: {
      unique: true,
    },
  },
  meaning: {
    type: String,
  },
});

const model = mongoose.model('word', Word);

export default model;
