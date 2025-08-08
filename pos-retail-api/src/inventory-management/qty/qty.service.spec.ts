import { Test, TestingModule } from '@nestjs/testing';
import { QtyService } from './qty.service';

describe('QtyService', () => {
  let service: QtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QtyService],
    }).compile();

    service = module.get<QtyService>(QtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
