import { Test, TestingModule } from '@nestjs/testing';
import { TicketsCommentsController } from './tickets-comments.controller';

describe('TicketsComents Controller', () => {
  let controller: TicketsCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsCommentsController],
    }).compile();

    controller = module.get<TicketsCommentsController>(TicketsCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
