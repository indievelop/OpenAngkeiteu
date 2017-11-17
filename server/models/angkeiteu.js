import mongoose from 'mongoose';
import MpathPlugin  from 'mongoose-mpath';

const Schema = mongoose.Schema;

const Angkeiteu = new Schema({
  writer: String,
  title: String,
  description: String,
  options: [{
    description: String,
    selectCount: {type: Number, default: 0},
    targetSubAngkeiteus: [{type: Schema.Types.ObjectId, ref: 'angkeiteu'}]
  }],
  participants: [{
    email: String,
    selectedOptionId: String,
    participationDate: {type: Date , default: Date.now}
  }],
  viewCount: {type: Number, default: 0},
  createdDate: {type: Date, default: Date.now}
});

Angkeiteu.plugin(MpathPlugin);
export default mongoose.model('angkeiteu', Angkeiteu);
