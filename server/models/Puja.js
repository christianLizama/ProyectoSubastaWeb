import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pujaSchema = new Schema({
    ultimaPuja: { type: Schema.ObjectId, ref: 'Usuario' },
    montoInicial:{type: Number, required: [true, 'Monto obligatorio']},
    fecha: {type: Date, required: [true, 'Fecha obligatorio']},
});

const Puja = mongoose.model('Puja', pujaSchema);

export default Puja;