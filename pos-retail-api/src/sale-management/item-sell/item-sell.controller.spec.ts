import { Test, TestingModule } from '@nestjs/testing';
import { ItemSellController } from './item-sell.controller';
import { ItemSellService } from './item-sell.service';

describe('ItemSellController', () => {
  let controller: ItemSellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemSellController],
      providers: [ItemSellService],
    }).compile();

    controller = module.get<ItemSellController>(ItemSellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
