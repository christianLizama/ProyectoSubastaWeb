import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubastaSchema = new Schema({
  ultimaPuja: { type: Object, ref: 'Puja' },
  duracion: {type: Number},
  estado: {type: Boolean},
  producto: { type: Object, ref: 'Producto' },
  chat: { type: Object, ref: 'Chat' }
  
});

const Subasta = mongoose.model('Subasta', SubastaSchema);

export default Subasta;