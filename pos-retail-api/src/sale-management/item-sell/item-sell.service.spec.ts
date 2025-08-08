import { Test, TestingModule } from '@nestjs/testing';
import { ItemSellService } from './item-sell.service';

describe('ItemSellService', () => {
  let service: ItemSellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemSellService],
    }).compile();

    service = module.get<ItemSellService>(ItemSellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
