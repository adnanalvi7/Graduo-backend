import { Test, TestingModule } from '@nestjs/testing';
import { SystemMenusService } from './system-menus.service';

describe('SystemMenusService', () => {
  let service: SystemMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemMenusService],
    }).compile();

    service = module.get<SystemMenusService>(SystemMenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
