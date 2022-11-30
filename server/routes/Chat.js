import express from 'express';
const router = express.Router();

// importar el modelo chat
import chat from '../models/Chat';

// Agregar una chat
router.post('/nuevo-chat', async(req, res) => {
  const body = req.body;  
  try {
    const chatDB = await chat.create(body);
    res.status(200).json(chatDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/chat/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const chatDB = await chat.findOne({_id});
    res.json(chatDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/chat', async(req, res) => {
  try {
    const chatDb = await chat.find();
    res.json(chatDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una chat
router.delete('/chat/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const chatDb = await chat.findByIdAndDelete({_id});
    if(!chatDb){
      return res.status(400).json({
        mensaje: 'No se encontrÃ³ el id indicado',
        error
      })
    }
    res.json(chatDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una chat
router.put('/chat/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const chatDb = await chat.findByIdAndUpdate(_id, body, {new: true});
    res.json(chatDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


module.exports = router;
