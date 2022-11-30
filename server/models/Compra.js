import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const compraSchema = new Schema({
  ultimaPuja: { type: Schema.ObjectId, ref: 'Puja' },
  idProducto: { type: Schema.ObjectId, ref: 'Producto' }
});

const Compra = mongoose.model('Compra', compraSchema);

export default Compra;