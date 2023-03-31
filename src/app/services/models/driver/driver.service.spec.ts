import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import {Prisma, PrismaClient} from "@prisma/client";

describe('DriverService', () => {
  let service: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverService, PrismaClient],
    }).compile();

    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

    const dr: Prisma.DriverCreateInput = {
        user: {
            connect: { id: 1 }
        },
        created_at: new Date(),
        updated_at: new Date(),
    }


    service.getDrivers().then((drivers) => {
        expect(drivers).toBeDefined();
    });

    service.createDriver(dr).then((driver) => {
        expect(driver).toBeDefined();
        expect(driver).toEqual({
          id: expect.any(Number),
          ...driver
        });

      service.getDriverById(driver.id).then((driver) => {
        expect(driver).toBeDefined();
      });

      service.updateDriver(driver.id, dr).then((driver) => {
        expect(driver).toBeDefined();
      });

        // service.deleteDriver(driver.id).then((driver) => {
        //   expect(driver).toBeDefined();
        // });



    });

  });
});
