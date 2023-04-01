import { Test, TestingModule } from '@nestjs/testing';
import { RiderService } from './rider.service';
import {Prisma, PrismaClient} from "@prisma/client";
import {UserService} from "../user/user.service";

describe('RiderService', () => {
  let service: RiderService;
  let user: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiderService, PrismaClient, UserService],
    }).compile();

    service = module.get<RiderService>(RiderService);
    user = module.get<UserService>(UserService)
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();


    const rider : Prisma.RiderCreateInput = {
      user: {
        connect: { id: 2 }
      },
      form_payment: "CREDIT_CARD",
      created_at: new Date(),
      updated_at: new Date(),
    }

    service.createRider(rider).then((rider) => {
        expect(rider).toBeDefined();
        expect(rider).toEqual({
          id: expect.any(Number),
          ...rider
        });

      // service.getRiderById(1).then((rider) => {
      //     expect(rider).toBeDefined();
      // });
      //
      // service.getRiders().then((riders) => {
      //   expect(riders).toBeDefined();
      // });
      //
      // service.updateRider(1, rider).then((rider) => {
      //     expect(rider).toBeDefined();
      // });
      //
      // service.deleteRider(1).then((rider) => {
      //     expect(rider).toBeDefined();
      // });

    });



  });
});
