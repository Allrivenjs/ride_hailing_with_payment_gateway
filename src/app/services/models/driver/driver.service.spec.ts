import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { Driver, Prisma, PrismaClient } from "@prisma/client";

describe('DriverService', () => {
  let service: DriverService;
  let _driver: Driver;
  const dr: Prisma.DriverCreateInput = {
    user: {
      connect: { id: 1 }
    },
    created_at: new Date(),
    updated_at: new Date(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverService, PrismaClient],
    }).compile();

    service = module.get<DriverService>(DriverService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create", function() {
    service.createDriver(dr).then((driver) => {
      expect(driver).toBeDefined();
      expect(driver).toEqual({
        id: expect.any(Number),
        ...driver
      });

      _driver = driver;

    });
  });

  it("should get", function() {
    service.getDriverById(_driver.id).then((driver) => {
      expect(driver).toBeDefined();
    });

  });

  it("should get all", function() {
    service.getDrivers().then((drivers) => {
      expect(drivers).toBeDefined();
    });
  });

  it("should update", function() {
    service.updateDriver(_driver.id, dr).then((driver) => {
      expect(driver).toBeDefined();
    });

  });

  it("should delete", function() {
    service.deleteDriver(_driver.id).then((driver) => {
      expect(driver).toBeDefined();
    });
  });
});
