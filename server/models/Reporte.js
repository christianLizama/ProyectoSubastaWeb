import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReporteSchema = new Schema({
  subastas: { type: [Schema.ObjectId], ref: 'Subasta' }
});

const Reporte = mongoose.model('Reporte', ReporteSchema);

export default Reporte;