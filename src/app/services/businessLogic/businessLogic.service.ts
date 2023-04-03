import { Injectable } from "@nestjs/common";
import { WompiService } from "../wompi/wompi.service";
import { CalculateService } from "../calculate/calculate.service";
import { DriverService } from "../models/driver/driver.service";
import { CreateTravelDtoInterface } from "../../DTO/create-travel.dto";
import { TravelService } from "../models/travel/travel.service";
import { RiderService } from "../models/rider/rider.service";
import { Driver, Prisma } from "@prisma/client";
import { UserService } from "../models/user/user.service";
import { WompiCardData, WompichargeData } from "../wompi/wompi.interface";
import { v4 as uuidv4 } from "uuid";
import { PaymentService } from "../models/payment/payment.service";
import { CardService } from "../models/card/card.service";
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class businessLogic {

  constructor(private readonly wompiService: WompiService,
              private readonly c: CalculateService,
              private readonly d: DriverService,
              private readonly r: RiderService,
              private readonly t: TravelService,
              private readonly u: UserService,
              private readonly p: PaymentService,
              private readonly ca: CardService
  ) {}


  async enRollDriver(): Promise<Driver> {
      const driver = await this.d.getDrivers();
      //get a random driver
      return driver[Math.floor(Math.random() * driver.length)];
  }
  async createTravel(
    {rider_id, initialLocation: { lat1, lat2, lon1, lon2 }}: CreateTravelDtoInterface,
  ) {
    const rider = await this.r.getRiderById(Number(rider_id));
    if (!rider) throw new NotFoundException('Rider not found');
    const driver = await this.enRollDriver();
    const distance = await this.c.calculateTimeDurationAndDistance( lat1, lon1, lat2, lon2 );
    const price = distance.calculateAmount();
    const data = distance.getResultResponse();
    const duration = data.duration_in_minutes;
    const distance_in_km = data.distance_in_km;
    return await this.t.createTravel({
      rider: {
        connect: {
          id: rider.id
        }
      },
      driver: {
        connect: { id: driver.id }
      },
      origin: data.origin,
      destination: data.destination,
      date: data.date,
      duration_in_minutes: duration,
      distance_in_km: distance_in_km,
      price: price,
      status: TravelService.TRAVEL_CREATED
    });
  }
  async startTravel(travel_id: number) {
    const travel = await this.t.getTravelById(travel_id);
    if (!travel) throw new NotFoundException('Travel not found');
    return await this.t.updateTravel(travel_id, {status: TravelService.TRAVEL_IN_PROGRESS});
  }
  async payTravel(travel_id: number, card_id: number, installments: number, currency: string = "COP") {
    const travel = await this.t.getTravelById(travel_id);
    if (!travel) throw new NotFoundException('Travel not found');
    const { price, rider_id } = travel;
    const rider = await this.r.getRiderById(rider_id);
    if (!rider) throw new NotFoundException('Rider not found');
    const user = await this.u.getUserById(rider.user_id);
    if (!user) throw new NotFoundException('User not found');
    const { email} = user;
    const { acceptance_token: token } = await this.wompiService.getMerchant();
    const card = await this.ca.getCardById(card_id);
    const dataPayment: WompichargeData = {
      acceptance_token: token,
      amount_in_cents: price,
      payment_method: {
        type: 'CARD',
        installments: installments,
        token: card.token_card,
      },
      currency: currency,
      customer_email: email,
      reference: uuidv4(),
    }

    const payment = await this.wompiService.createCharge(token);
    const dataPay: Prisma.PaymentCreateInput = {
      travel: {
        connect: { id: travel_id }
      },
      currency: currency,
      amount: price,
      status: payment.status,
      reference: dataPayment.reference,
    }
    await this.p.create(dataPay);
    return await this.t.updateTravel(travel_id, {status: TravelService.TRAVEL_FINISHED});

  }
  async getCardByRiderId(rider_id: number) {
    const rider = await this.r.getRiderById(rider_id);
    if (!rider) throw new Error('Rider not found');
    return await this.ca.getCardByRiderId(rider_id);
  }
  async createCard(c: WompiCardData, rider_id: number) {
    const rider = await this.r.getRiderById(rider_id);
    if (!rider) throw new NotFoundException('Rider not found');
    const card = await this.wompiService.createToken(c, rider.id);
    const data: Prisma.CardCreateInput = {
      card_type: card.card_type,
      rider: {
        connect: { id: rider_id }
      },
      payload: card.payload,
      token_card: card.token_card,
      expiration_date: card.expiration_date,
      last_digits: card.last_digits,
      token_expiration: card.expiration_date,
    }
    return await this.ca.createCard(data);
  }

  async finishTravel(travel_id: number) {
    const travel = await this.t.getTravelById(travel_id);
    if (!travel) throw new NotFoundException('Travel not found');
    return await this.t.updateTravel(travel_id, {status: TravelService.TRAVEL_FINISHED});
  }

}
