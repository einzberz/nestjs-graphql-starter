import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientToServerService {
  handleMessage(clientId: string, message: any) {
    console.log(`Message from client ${clientId}: ${message}`);
    console.log(message);
  }
}
