import { Test, TestingModule } from '@nestjs/testing';
import { BoardPermissionService } from './board-permission.service';

describe('BoardPermissionService', () => {
  let service: BoardPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardPermissionService],
    }).compile();

    service = module.get<BoardPermissionService>(BoardPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
