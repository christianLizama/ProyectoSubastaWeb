import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  pujas: { type: [Object], ref: 'Puja' },
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;