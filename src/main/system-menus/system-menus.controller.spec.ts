import { Test, TestingModule } from '@nestjs/testing';
import { SystemMenusController } from './system-menus.controller';

describe('SystemMenus Controller', () => {
  let controller: SystemMenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemMenusController],
    }).compile();

    controller = module.get<SystemMenusController>(SystemMenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
