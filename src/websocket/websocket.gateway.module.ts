import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websocket.gateway';
import { ClientToServerService } from './client-to-server/client-to-server.service';
import { ServerToClientService } from './server-to-client/server-to-client.service';

@Module({
  imports: [],
  providers: [WebsocketsGateway, ClientToServerService, ServerToClientService],
  exports: [],
})
export class WebSocketModule {}
