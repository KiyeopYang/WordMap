import mongoose from 'mongoose';

const { Schema } = mongoose;
const Game = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  datetime: {
    type: Date,
    default: new Date(),
  },
  words: [
    {
      word: String,
      meaning: String,
      wordId: Schema.Types.ObjectId,
      success: Boolean,
    },
  ],
});

const model = mongoose.model('game', Game);

export default model;
