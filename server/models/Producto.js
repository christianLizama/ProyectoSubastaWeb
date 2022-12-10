import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombreProducto: {type: String, required: [true, 'Nombre obligatorio']},
    montoInicial:{type: Number, required: [true, 'Monto inicial obligatorio']},
    estado:{type: Boolean, required: [true, 'Estado obligatorio']}
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;