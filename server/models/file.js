import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const File = new Schema({
  accountId: {type: Schema.Types.ObjectId, ref: 'account'},
  connectedObj: {
    kind: String,
    id: {type: Schema.Types.ObjectId, refPath: 'connection.kind'}
  },
  path: String,
  createdDate: {type: Date, default: Date.now}
});

export default mongoose.model('file', File);
