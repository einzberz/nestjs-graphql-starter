import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ServerToClientService {
  private server: Server;
  constructor(private readonly userService: UsersService) {}
  setServer(server: Server) {
    this.server = server;
  }

  broadcastMessage(message: string) {
    if (this.server) {
      this.server.emit('messageToClient', message);
      console.log('message-to-client: ', message);
    }
  }

  async sendMessageToClient(clientId: string, message: string) {
    const client = this.server.sockets.sockets.get(clientId);
    if (client) {
      client.emit('messageToClient', message);
      const result = await this.userService.findOne('66696fc2ba7c95ffa3a735a5');
      console.log(result);
      client.emit('messageToClient', result);
    }
  }
}
