import { Test, TestingModule } from '@nestjs/testing';
import { TravelService } from './travel.service';
import { Prisma, PrismaClient, Travel } from "@prisma/client";
import { DriverService } from "../driver/driver.service";
import { RiderService } from "../rider/rider.service";

describe('TravelService', () => {
  let service: TravelService;
  let tr: Prisma.TravelCreateInput;
  let _travel: Travel;
  const tr2 = {
    date: new Date(),
    distance_in_km: 10,
    duration_in_minutes: 100,
    origin: "{ lat: 0, lng: 0 }",
    destination: "{ lat: 1000, lng: 1000 }",
    created_at: new Date(),
    updated_at: new Date()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelService, PrismaClient, DriverService, RiderService],
    }).compile();

    service = module.get<TravelService>(TravelService);
    const driver = module.get<DriverService>(DriverService);
    const rider = module.get<RiderService>(RiderService);
    const d = await driver.getDrivers();
    const r = await rider.getRiders();

    tr = {
      driver: {
        connect: {id: d[0].id}
      },
      rider: {
        connect: {id: r[0].id}
      },
      ...tr2
    };

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it("should create", function() {
    service.createTravel(tr).then((travel) => {
      expect(travel).toBeDefined();
      expect(travel).toEqual({
        id: expect.any(Number),
        driver_id: expect.any(Number),
        rider_id: expect.any(Number),
        ...tr2
      });
      _travel = travel;
    });
  });

  it("should get", function() {
    service.getTravelById(_travel.id).then((travel) => {
      expect(travel).toBeDefined();
      expect(travel).toEqual({
        id: expect.any(Number),
        driver_id: expect.any(Number),
        rider_id: expect.any(Number),
        ...tr2
      })
    });
  });

  it("should get all", function() {
    service.getTravels().then((travels) => {
      expect(travels).toBeDefined();
    });
  });

  it("should update", function() {
    service.updateTravel(_travel.id, tr).then((travel) => {
      expect(travel).toBeDefined();
      expect(travel).toEqual({
        id: expect.any(Number),
        driver_id: expect.any(Number),
        rider_id: expect.any(Number),
        ...tr2
      })
    });
  });

  it("should delete", function() {
    // service.deleteTravel(_travel.id).then((travel) => {
    //     expect(travel).toBeDefined();
    // });
  });



});
