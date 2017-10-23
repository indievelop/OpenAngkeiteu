import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Angkeiteu = new Schema({
  writer: String,
  title: String,
  description: String,
  options: [{ description: String,
              selectCount: {type: Number, default: 0}
            }],
  viewCount: {type: Number, default: 0},
  createdDate: {type: Date, default: Date.now}
});

export default mongoose.model('angkeiteu', Angkeiteu);
