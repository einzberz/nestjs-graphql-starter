import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class ServerToClientService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  broadcastMessage(message: string) {
    if (this.server) {
      this.server.emit('messageToClient', message);
      console.log('message-to-client: ', message);
    }
  }

  sendMessageToClient(clientId: string, message: string) {
    const client = this.server.sockets.sockets.get(clientId);
    if (client) {
      client.emit('messageToClient', message);
    }
  }
}
