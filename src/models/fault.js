import mongoose from 'mongoose';

const { Schema } = mongoose;
const Fault = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  word: {
    type: String,
    index: {
      unique: true,
    },
  },
  wordId: {
    type: Schema.Types.ObjectId,
  },
  meaning: {
    type: String,
  },
  weight: Number,
});

const model = mongoose.model('fault', Fault);

export default model;
