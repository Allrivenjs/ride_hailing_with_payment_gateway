import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calculate.service';
import {HttpModule} from "@nestjs/axios";


describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateService],
      imports: [HttpModule],
    }).compile();
    service = module.get<CalculateService>(CalculateService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    await service.getTimeDurationAndDistance(8.690958, 49.404662, 8.687868, 49.390139);
    expect(service.calculateAmount()).toBeDefined();
  });
});
