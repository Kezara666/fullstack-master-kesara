import { Test, TestingModule } from '@nestjs/testing';
import { QtyTypeController } from './qty-type.controller';
import { QtyTypeService } from './qty-type.service';

describe('QtyTypeController', () => {
  let controller: QtyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QtyTypeController],
      providers: [QtyTypeService],
    }).compile();

    controller = module.get<QtyTypeController>(QtyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
