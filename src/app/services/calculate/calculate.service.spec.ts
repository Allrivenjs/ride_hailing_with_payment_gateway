import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateService],
    }).compile();

    service = module.get<CalculateService>(CalculateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
