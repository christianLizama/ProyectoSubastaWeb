import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  pujas: { type: [Schema.ObjectId], ref: 'Puja' },
  pujaMasAlta: { type: Schema.ObjectId, ref: 'Puja' },
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;