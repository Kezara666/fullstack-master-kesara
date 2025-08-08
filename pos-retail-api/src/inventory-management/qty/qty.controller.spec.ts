import { Test, TestingModule } from '@nestjs/testing';
import { QtyController } from './qty.controller';
import { QtyService } from './qty.service';

describe('QtyController', () => {
  let controller: QtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QtyController],
      providers: [QtyService],
    }).compile();

    controller = module.get<QtyController>(QtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
