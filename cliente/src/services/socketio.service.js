import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}
    
    broadcast(){
        this.socket.on('my broadcast', (data) => {
            console.log(data);
        });
    }
    setupSocketConnection() {
        this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
        this.socket.emit('my message', 'Hello there from Vue.');
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    
  }
  
  export default new SocketioService();