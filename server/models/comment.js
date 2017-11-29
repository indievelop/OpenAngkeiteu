import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Comment = new Schema({
  angkeiteuId: {type: Schema.Types.ObjectId, ref: 'angkeiteu'},
  writer: String,
  content: String,
  recommendations:[{
    accountId: {type: Schema.Types.ObjectId, ref: 'account'},
    recommendationDate: {type: Date , default: Date.now}
  }],
  createdDate: {type: Date, default: Date.now}
});

export default mongoose.model('comment', Comment);
