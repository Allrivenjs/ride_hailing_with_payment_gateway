import { Test, TestingModule } from '@nestjs/testing';
import { RiderService } from './rider.service';
import { Prisma, PrismaClient, Rider } from "@prisma/client";
import {UserService} from "../user/user.service";

describe('RiderService', () => {
  let service: RiderService;
  let user: UserService;
  let rider : Prisma.RiderCreateInput;
  let _rider: Rider
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiderService, PrismaClient, UserService],
    }).compile();

    service = module.get<RiderService>(RiderService);
    user = module.get<UserService>(UserService)
    const u = await user.getUsers();
    rider = {
      user: {
        connect: { id: u[0].id }
      },
      form_payment: "CREDIT_CARD",
      created_at: new Date(),
      updated_at: new Date(),
    }
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it("should create", function() {
    service.createRider(rider).then((rider) => {
      expect(rider).toBeDefined();
      expect(rider).toEqual({
        id: expect.any(Number),
        ...rider
      });
      _rider = rider;
    });
  });

  it("should get", function() {
    service.getRiderById(_rider.id).then((businessLogic) => {
        expect(businessLogic).toBeDefined();
    });
  });

  it("should get all", function() {
    service.getRiders().then((riders) => {
      expect(riders).toBeDefined();
    });
  });

  it("should update", function() {
    service.updateRider(_rider.id, rider).then((businessLogic) => {
        expect(businessLogic).toBeDefined();
    });
  });

  it("should delete", function() {
    service.deleteRider(_rider.id).then((businessLogic) => {
        expect(businessLogic).toBeDefined();
    });
  });
});
