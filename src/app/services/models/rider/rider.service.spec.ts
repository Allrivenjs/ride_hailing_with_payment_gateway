import { Test, TestingModule } from '@nestjs/testing';
import { RiderService } from './rider.service';

describe('RiderService', () => {
  let service: RiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiderService],
    }).compile();

    service = module.get<RiderService>(RiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
