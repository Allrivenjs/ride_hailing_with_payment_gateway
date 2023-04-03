import { Test, TestingModule } from '@nestjs/testing';
import { RidesController } from './rides.controller';
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import { RiderService } from "../../services/models/rider/rider.service";
import { Card, PrismaClient, Rider, Travel } from "@prisma/client";
import { ray } from "node-ray";
import { TravelService } from "../../services/models/travel/travel.service";
describe('RidesController', () => {

  let app: INestApplication;
  let rider: RiderService;
  let travel: TravelService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [RiderService, PrismaClient, TravelService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    rider = moduleFixture.get<RiderService>(RiderService);
    travel = moduleFixture.get<TravelService>(TravelService);

  });

  afterAll(async () => {
    await app.close();
  });


describe('RidesController', () => {
  let _rider: Rider;
  let _travel: Travel;
  let _card: Card;
  beforeAll(async () => {
    const riders = await rider.getRiders();
    _rider = riders[0];
  });

  it("should return start travel  ", function() {
     return  request(app.getHttpServer())
       .post("/api/ride/start")
       .send({
         rider_id: _rider.id,
         initialLocation: {
           lat1: "8.690958",
           lon1: "49.404662",
           lat2: "8.687868",
           lon2: "49.390139",
         }
       })
       .expect(201)
       .expect((res) => {
          _travel = res.body;
          expect(res.body).toBeDefined();
       });
  });

  it("should return get card  ", async () => {
      return request(app.getHttpServer())
        .get('/api/ride/get-card')
        .send({
          rider_id: _rider.id
        }).expect(200)
        .expect(async (res) => {
          _card = res.body;
          expect(res.body).toBeDefined();
        });
  });

  it("should return created card", function() {
    if (!_card) {
      return  request(app.getHttpServer())
        .post('/api/ride/create-card')
        .send({
          rider_id: _rider.id,
          card: {
            number: "4242424242424242",
            exp_month: "08",
            exp_year: "28",
            cvc: "123",
            card_holder: "José Pérez",
          }
        }).expect(201)
        .expect((res) => {
          _card = res.body;
          expect(res.body).toBeDefined();
        });
    }
  });

  it("should return pay  ", function() {
    return request(app.getHttpServer())
      .post('/api/ride/pay')
      .send({
        travel_id: _travel.id,
        card_id: _card.id,
        installment: 1
      }).expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });

  it("should return finished", function() {
    return request(app.getHttpServer())
      .post('/api/ride/finish')
      .send({
        travel_id: _travel.id,
      }).expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
      });
  });
});

});
