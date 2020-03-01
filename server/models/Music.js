import mongoose from "mongoose";

const musicSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  music: {
    type: Object,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

const Music = mongoose.model("Music", musicSchema);

export default Music;
