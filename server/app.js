import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
const http = require('http').createServer(app);

const app = express();

//Conexion DB Local
/* const uri = 'mongodb://localhost:27017/myapp'; */
//hola
//Conexion DB nubr
const uri = 'mongodb+srv://proyecto:proyecto@cluster0.lafxcfw.mongodb.net/test';
const options = {useNewUrlParser: true};
// Or using promises
mongoose.connect(uri, options).then(
  () => { console.log('Conectado a DB') },
  err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
/* app.get('/', (req, res) => {
  res.send('Hello World!');
}); */

app.use('/api', require('./routes/Chat'));
app.use('/api', require('./routes/Compra'));
app.use('/api', require('./routes/Producto'));
app.use('/api', require('./routes/Puja'));
app.use('/api', require('./routes/Reporte'));
app.use('/api', require('./routes/Subasta'));
app.use('/api', require('./routes/Usuario'));



// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.APPPORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});


const io = require('socket.io')(http, {
  allowEIO3: true,
  cors: {
      origin: true,
      credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });
  socket.on('message' ,(msg)=>{
    io.emit('mensaje:recibido', msg)
  });
});

//Puerto de socket
var portsocket = process.env.SOCKETPORT || 5003 ;

http.listen(portsocket, () => {
  console.log('listening on :',portsocket);
});
