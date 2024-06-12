import { Test, TestingModule } from '@nestjs/testing';
import { ClientToServerService } from './client-to-server.service';

describe('clientToServer', () => {
  let service: ClientToServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientToServerService],
    }).compile();

    service = module.get<ClientToServerService>(ClientToServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
