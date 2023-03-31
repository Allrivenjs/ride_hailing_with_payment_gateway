import { Test, TestingModule } from '@nestjs/testing';
import { TravelService } from './travel.service';
import {Prisma, PrismaClient} from "@prisma/client";

describe('TravelService', () => {
  let service: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelService, PrismaClient],
    }).compile();

    service = module.get<TravelService>(TravelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

    const tr2 = {
        date: new Date(),
        distance_in_km: 10,
        duration_in_minutes: 100,
        origin: "{ lat: 0, lng: 0 }",
        destination: "{ lat: 1000, lng: 1000 }",
        created_at: new Date(),
        updated_at: new Date()
    }

    const tr: Prisma.TravelCreateInput = {
      driver: {
        connect: {id: 3}
      },
      rider: {
        connect: {id: 1}
      },
      ...tr2
    };

    service.getTravels().then((travels) => {
        expect(travels).toBeDefined();
    });

    service.createTravel(tr).then((travel) => {
        expect(travel).toBeDefined();



        expect(travel).toEqual({
          id: expect.any(Number),
          driver_id: expect.any(Number),
          rider_id: expect.any(Number),
          ...tr2
        })


        service.getTravelById(travel.id).then((travel) => {
            expect(travel).toBeDefined();
            expect(travel).toEqual({
              id: expect.any(Number),
              driver_id: expect.any(Number),
              rider_id: expect.any(Number),
              ...tr2
            })
        });

        service.updateTravel(travel.id, tr).then((travel) => {
            expect(travel).toBeDefined();
            expect(travel).toEqual({
              id: expect.any(Number),
              driver_id: expect.any(Number),
              rider_id: expect.any(Number),
              ...tr2
            })
        });

        // service.deleteTravel(travel.id).then((travel) => {
        //     expect(travel).toBeDefined();
        // });
    });




  });
});
