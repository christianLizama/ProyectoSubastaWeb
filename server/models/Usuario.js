import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombreUsuario: {type: String, required: [true, 'Nombre obligatorio']},
    contra:{type: String, required: [true, 'Contraseña obligatorio']},
    tipoUsuario: {type: String, required: [true, 'Rol obligatorio']},
    misCompras: { type: [Schema.ObjectId], ref: 'Compra' }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;