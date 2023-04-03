import { Test, TestingModule } from '@nestjs/testing';
import { WompichargeData } from "./wompi.interface";
import {HttpModule} from "@nestjs/axios";
import { RiderService } from "../models/rider/rider.service";
import { CardService } from "../models/card/card.service";
import { PrismaClient } from "@prisma/client";
import { ray } from "node-ray";
import { v4 as uuidv4 } from 'uuid';
import { WompiService } from "./wompi.service";

describe('WompiService', () => {
  let service: WompiService;
  let rider: RiderService;
  let card: CardService;
  let token: string;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WompiService, CardService, PrismaClient, RiderService],
      imports: [HttpModule],
    }).compile();

    service = module.get<WompiService>(WompiService);
    rider = module.get<RiderService>(RiderService);
    card = module.get<CardService>(CardService);
    const { acceptance_token } = await service.getMerchant();
    token = acceptance_token;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create card", async function() {
    const CardData = {
      "number": "4242424242424242",
      "exp_month": "08",
      "exp_year": "28",
      "cvc": "123",
      "card_holder": "José Pérez"
    }
    const id = await rider.getRiders();
    expect(id).toBeDefined();
    await service.createToken(CardData, id[0].id);
    await service.getMerchant();
  });


  it("should create charge and verify status ", async function() {

    const c = await card.getCards();
    expect(c).toBeDefined();

    const chargeData: WompichargeData = {
      "currency": "COP",
      "amount_in_cents": 1000000,
      "customer_email": "test@gmail.com",
      "payment_method": {
        "type": "CARD",
        "installments": 1,
        "token": c[0].token_card
      },
      "reference": uuidv4(),
      "acceptance_token": token
    }
    const charge = await service.createCharge(chargeData);
    expect(charge).toBeDefined();
    const status = await service.verifyStatus(charge.id);
    expect(status).toBeDefined();
  });


});
