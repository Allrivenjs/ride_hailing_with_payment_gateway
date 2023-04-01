import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import {Card, Prisma, PrismaClient} from "@prisma/client";
import {RiderService} from "../rider/rider.service";

describe('CardService', () => {
  let service: CardService;
  let rider: RiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService, RiderService, PrismaClient],
    }).compile();

    service = module.get<CardService>(CardService);
    rider = module.get<RiderService>(RiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();



    const c : Prisma.CardCreateInput = {
      rider: {
        connect: { id: 1}
      },
      card_type: "CREDIT_CARD",
      token_card: "123456789",
      last_digits: "1234",
      expiration_date: "12/12/2024",
      token_expiration: new Date("12/12/2025"),
      created_at: new Date(),
      updated_at: new Date(),
    }

    service.createCard(c).then((card) => {
        expect(card).toBeDefined();
        expect(card).toEqual({
          id: expect.any(Number),
          ...card
        });
      service.getCardById(card.id).then((card) => {
        expect(card).toBeDefined();

      });

      service.getCards().then((cards) => {
        expect(cards).toBeDefined();
      });

      service.updateCard(card.id, card).then((card) => {
        expect(card).toBeDefined();
      });

      // service.deleteCard(card.id).then((card) => {
      //     expect(card).toBeDefined();
      // });
    });


  });
});
