import express from 'express';
const router = express.Router();

// importar el modelo producto
import producto from '../models/Producto';

// Agregar una producto
router.post('/nuevo-producto', async(req, res) => {
  const body = req.body;  
  try {
    const productoDB = await producto.create(body);
    res.status(200).json(productoDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/producto/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const productoDB = await producto.findOne({_id});
    res.json(productoDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/producto', async(req, res) => {
  try {
    const productoDb = await producto.find();
    res.json(productoDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una producto
router.delete('/producto/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const productoDb = await producto.findByIdAndDelete({_id});
    if(!productoDb){
      return res.status(400).json({
        mensaje: 'No se encontrÃ³ el id indicado',
        error
      })
    }
    res.json(productoDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una producto
router.put('/producto/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const productoDb = await producto.findByIdAndUpdate(_id, body, {new: true});
    res.json(productoDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


module.exports = router;
