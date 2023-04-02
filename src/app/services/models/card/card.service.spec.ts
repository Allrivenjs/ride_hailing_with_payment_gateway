import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import {Card, Prisma, PrismaClient} from "@prisma/client";
import {RiderService} from "../rider/rider.service";

describe('CardService', () => {
  let service: CardService;
  let rider: RiderService;
  let card: Card;

  let c : Prisma.CardCreateInput;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService, RiderService, PrismaClient],
    }).compile();

    service = module.get<CardService>(CardService);
    rider = module.get<RiderService>(RiderService);
    const r = await rider.getRiders();
    c = {
      rider: {
        connect: { id: r[0].id }
      },
      card_type: "CREDIT_CARD",
      token_card: "123456789",
      last_digits: "1234",
      expiration_date: "12/12/2024",
      token_expiration: new Date("12/12/2025"),
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create", function() {
    service.createCard(c).then((_card) => {
      expect(_card).toBeDefined();
      expect(_card).toEqual({
        id: expect.any(Number),
        ..._card
      });

      card = _card;
    });
  });

  it("should get", function() {
    service.getCardById(card.id).then((card) => {
      expect(card).toBeDefined();
    });  
  });

  it("should get all", function() {
    service.getCards().then((cards) => {
      expect(cards).toBeDefined();
    });
  });

  it("should update", function() {
    service.updateCard(card.id, card).then((card) => {
      expect(card).toBeDefined();
    });
  });

  it("should delete", function() {
    // service.deleteCard(card.id).then((card) => {
    //     expect(card).toBeDefined();
    // });
  });

});
