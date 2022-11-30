import express from 'express';
const router = express.Router();

// importar el modelo puja
import puja from '../models/Puja';

// Agregar una puja
router.post('/nuevo-puja', async(req, res) => {
  const body = req.body;  
  try {
    const pujaDB = await puja.create(body);
    res.status(200).json(pujaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/puja/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const pujaDB = await puja.findOne({_id});
    res.json(pujaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/puja', async(req, res) => {
  try {
    const pujaDb = await puja.find();
    res.json(pujaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una puja
router.delete('/puja/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const pujaDb = await puja.findByIdAndDelete({_id});
    if(!pujaDb){
      return res.status(400).json({
        mensaje: 'No se encontrÃ³ el id indicado',
        error
      })
    }
    res.json(pujaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una puja
router.put('/puja/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const pujaDb = await puja.findByIdAndUpdate(_id, body, {new: true});
    res.json(pujaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


module.exports = router;
