import express from 'express';
const router = express.Router();

// importar el modelo subasta
import subasta from '../models/Subasta';

// Agregar una subasta
router.post('/nuevo-subasta', async(req, res) => {
  const body = req.body;  
  try {
    const subastaDB = await subasta.create(body);
    res.status(200).json(subastaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/subasta/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const subastaDB = await subasta.findOne({_id});
    res.json(subastaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/subasta', async(req, res) => {
  try {
    const subastaDb = await subasta.find();
    res.json(subastaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una subasta
router.delete('/subasta/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const subastaDb = await subasta.findByIdAndDelete({_id});
    if(!subastaDb){
      return res.status(400).json({
        mensaje: 'No se encontrÃ³ el id indicado',
        error
      })
    }
    res.json(subastaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una subasta
router.put('/subasta/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const subastaDb = await subasta.findByIdAndUpdate(_id, body, {new: true});
    res.json(subastaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


module.exports = router;
