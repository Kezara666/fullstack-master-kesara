import { Test, TestingModule } from '@nestjs/testing';
import { QtyTypeService } from './qty-type.service';

describe('QtyTypeService', () => {
  let service: QtyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QtyTypeService],
    }).compile();

    service = module.get<QtyTypeService>(QtyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
