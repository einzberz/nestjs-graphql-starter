import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ClientToServerService } from './client-to-server/client-to-server.service';
import { ServerToClientService } from './server-to-client/server-to-client.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins. In production, specify allowed origins.
    methods: ['GET', 'POST'],
  },
})
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Set<Socket> = new Set();

  @WebSocketServer() server: Server;

  constructor(
    private readonly cts: ClientToServerService,
    private readonly stc: ServerToClientService,
  ) {}
  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
    this.stc.setServer(server);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // this.stc.broadcastMessage('hello from server');
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: any): void {
    // console.log(`Message from client ${client.id}: ${payload}`);
    this.cts.handleMessage(client.id, payload);
    this.stc.broadcastMessage('hello from server');
    this.stc.sendMessageToClient(client.id, 'TEST');
  }
}
