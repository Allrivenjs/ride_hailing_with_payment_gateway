import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { WompiService } from './app/services/wompi/wompi.service';
import { RidesController } from './app/controllers/rides/rides.controller';
import { CalculateService } from './app/services/calculate/calculate.service';
import { UserService } from './app/services/models/user/user.service';
import { RiderService } from './app/services/models/rider/rider.service';
import { CardService } from './app/services/models/card/card.service';
import { TravelService } from './app/services/models/travel/travel.service';
import { DriverService } from './app/services/models/driver/driver.service';
import {PrismaClient} from "@prisma/client";
import { PaymentService } from './app/services/models/payment/payment.service';
@Module({
  imports: [ HttpModule ],
  controllers: [AppController, RidesController],
  providers: [AppService, WompiService, CalculateService, PrismaClient, UserService, RiderService, CardService, TravelService, DriverService, PaymentService],
})
export class AppModule {}
