import { Test, TestingModule } from '@nestjs/testing';
import { ServerToClientService } from './server-to-client.service';

describe('ServerToClientService', () => {
  let service: ServerToClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerToClientService],
    }).compile();

    service = module.get<ServerToClientService>(ServerToClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
