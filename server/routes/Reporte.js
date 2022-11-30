import express from 'express';
const router = express.Router();

// importar el modelo reporte
import reporte from '../models/Reporte';

// Agregar una reporte
router.post('/nuevo-reporte', async(req, res) => {
  const body = req.body;  
  try {
    const reporteDB = await reporte.create(body);
    res.status(200).json(reporteDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/reporte/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const reporteDB = await reporte.findOne({_id});
    res.json(reporteDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/reporte', async(req, res) => {
  try {
    const reporteDb = await reporte.find();
    res.json(reporteDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una reporte
router.delete('/reporte/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const reporteDb = await reporte.findByIdAndDelete({_id});
    if(!reporteDb){
      return res.status(400).json({
        mensaje: 'No se encontrÃ³ el id indicado',
        error
      })
    }
    res.json(reporteDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una reporte
router.put('/reporte/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const reporteDb = await reporte.findByIdAndUpdate(_id, body, {new: true});
    res.json(reporteDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


module.exports = router;
