import { Test, TestingModule } from '@nestjs/testing';
import { WompiService } from './wompi.service';
import {HttpModule} from "@nestjs/axios";
import { RiderService } from "../models/rider/rider.service";
import { CardService } from "../models/card/card.service";
import { PrismaClient } from "@prisma/client";

describe('WompiService', () => {
  let service: WompiService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WompiService, CardService, PrismaClient],
      imports: [HttpModule],
    }).compile();

    service = module.get<WompiService>(WompiService);
    // rider = module.get<RiderService>(RiderService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const CardData = {                                    "number": "4242424242424242",
      "exp_month": "08",
      "exp_year": "28",
      "cvc": "123",
      "card_holder": "José Pérez"
    }

    await service.createToken(CardData, 2)
  });
});
