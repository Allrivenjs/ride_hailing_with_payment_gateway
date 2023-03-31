import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WompiService } from './app/services/wompi/wompi.service';
import { RidesController } from './app/controllers/rides/rides.controller';
import { CalculateService } from './app/services/calculate/calculate.service';
import { UserService } from './app/services/models/user/user.service';
import { RiderService } from './app/services/models/rider/rider.service';
import { CardService } from './app/services/models/card/card.service';
import { TravelService } from './app/services/models/travel/travel.service';
import { DriverService } from './app/services/models/driver/driver.service';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
@Module({
  imports: [],
  controllers: [AppController, RidesController],
  providers: [AppService, WompiService, CalculateService, { provide: PrismaClient, useValue: prisma  }, UserService, RiderService, CardService, TravelService, DriverService],
})
export class AppModule {}
