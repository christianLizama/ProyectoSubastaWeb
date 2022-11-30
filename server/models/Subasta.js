import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubastaSchema = new Schema({
  ultimaPuja: { type: Schema.ObjectId, ref: 'Puja' },
  duracion: {type: Number},
  estado: {type: Boolean},
  producto: { type: Schema.ObjectId, ref: 'Producto' },
  chat: { type: Schema.ObjectId, ref: 'Chat' }
  
});

const Subasta = mongoose.model('Subasta', SubastaSchema);

export default Subasta;