import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { WompiService } from './app/services/wompi/wompi.service';
import { CalculateService } from './app/services/calculate/calculate.service';
import { UserService } from './app/services/models/user/user.service';
import { RiderService } from './app/services/models/rider/rider.service';
import { CardService } from './app/services/models/card/card.service';
import { TravelService } from './app/services/models/travel/travel.service';
import { DriverService } from './app/services/models/driver/driver.service';
import {PrismaClient} from "@prisma/client";
import { PaymentService } from './app/services/models/payment/payment.service';
import { RidesController } from "./app/controllers/rides/rides.controller";
import { LoggerModule } from "nestjs-pino";
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from "./app/middlewares/correlation-id/correlation-id.middleware";
import { Request, Response } from "express";
import { businessLogic } from './app/services/businessLogic/businessLogic.service';
import { AllExceptionsFilter } from "./app/middlewares/all-exceptions-filter/all-exceptions-filter.pipe";

@Module({
  imports: [ HttpModule, LoggerModule.forRoot({
    pinoHttp: {
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          prettyPrint: { colorize: true, translateTime: true },
          messageKey: 'message',
        }
      } : undefined,
      messageKey: 'message',
      customProps: (req: Request) => {
        return {
          correlationId: req.headers[CORRELATION_ID_HEADER],
        }
      },
      autoLogging: false,
      serializers: {
        req: (req: Request) => {
          return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
          }
        },
        res: (res: Response) => {
          return {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
          }
        }
      }
    }
  })],
  controllers: [AppController, RidesController],
  providers: [
    AppService,
    WompiService,
    CalculateService,
    PrismaClient,
    UserService,
    RiderService,
    CardService,
    TravelService,
    DriverService,
    PaymentService,
    businessLogic,
    AllExceptionsFilter
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes('*');
  }

}
