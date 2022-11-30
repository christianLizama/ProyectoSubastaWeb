import express from 'express';
const router = express.Router();

// importar el modelo compra
import compra from '../models/Compra';

// Agregar una compra
router.post('/nuevo-compra', async(req, res) => {
  const body = req.body;  
  try {
    const compraDB = await compra.create(body);
    res.status(200).json(compraDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/compra/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const compraDB = await compra.findOne({_id});
    res.json(compraDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/compra', async(req, res) => {
  try {
    const compraDb = await compra.find();
    res.json(compraDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una compra
router.delete('/compra/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const compraDb = await compra.findByIdAndDelete({_id});
    if(!compraDb){
      return res.status(400).json({
        mensaje: 'No se encontrÃ³ el id indicado',
        error
      })
    }
    res.json(compraDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una compra
router.put('/compra/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const compraDb = await compra.findByIdAndUpdate(_id, body, {new: true});
    res.json(compraDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


module.exports = router;
