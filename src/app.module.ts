import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WompiServiceService } from './wompi-service/wompi-service.service';
import { WompiService } from './app/services/wompi/wompi.service';
import { RidesController } from './app/controllers/rides/rides.controller';
import { CalculateService } from './app/services/calculate/calculate.service';
import { RidesController } from './app/controllers/rides/rides.controller';

@Module({
  imports: [],
  controllers: [AppController, RidesController],
  providers: [AppService, WompiServiceService, WompiService, CalculateService],
})
export class AppModule {}
