import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websocket.gateway';
import { ClientToServerService } from './client-to-server/client-to-server.service';
import { ServerToClientService } from './server-to-client/server-to-client.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [WebsocketsGateway, ClientToServerService, ServerToClientService],
  exports: [],
})
export class WebSocketModule {}
