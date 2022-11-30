import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pujaSchema = new Schema({
    usuario: { type: Object, ref: 'Usuario' },
    montoInicial:{type: Number, required: [true, 'Monto obligatorio']},
    fecha: {type: Date, required: [true, 'Fecha obligatorio']},
});

const Puja = mongoose.model('Puja', pujaSchema);

export default Puja;