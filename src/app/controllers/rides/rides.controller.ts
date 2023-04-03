import { Controller, Post, Body, Get, UseFilters, HttpCode } from "@nestjs/common";
import { CreateTravelDto } from "../../DTO/create-travel.dto";
import { Logger } from "@nestjs/common";
import { businessLogic } from "../../services/businessLogic/businessLogic.service";
import { CardDto, getRiderDTO, getTravelDTO, paymentSourceDto } from "../../DTO/card.dto";
import { AllExceptionsFilter } from "../../middlewares/all-exceptions-filter/all-exceptions-filter.pipe";
import { ray } from "node-ray";


@Controller('api/ride')
@UseFilters(new AllExceptionsFilter())
export class RidesController {
    private readonly logger: Logger = new Logger(RidesController.name);

    constructor(private readonly bl: businessLogic) {}
    @Get()
    test(): string {
        this.logger.log('Controller test of rides');
        return "Controller test of rides";
    }

    @Post('/start')
    // @HttpCode(201)
    async createTravel(@Body() CreateTravelDto: CreateTravelDto) {
        try {
            const { rider_id, initialLocation: { lat1, lat2, lon2, lon1 } } = CreateTravelDto;
            this.logger.log(`createTravel`);
            const travel  =  await this.bl.createTravel({ rider_id, initialLocation: { lat1, lat2, lon2, lon1 } });
            this.logger.log(`travel: ${JSON.stringify(travel)}`);
            await this.bl.startTravel(travel.id)
            this.logger.log(`start travel: ${travel.id}`)
            return travel;
        }catch (e) {
            console.log(e);
        }
    }

    @Get('/get-card')
    @HttpCode(200)
    async getCard(@Body() rider: getRiderDTO ) {
        const { rider_id } = rider;
        this.logger.log(`getCard`);
        const card = await this.bl.getCardByRiderId(rider_id);
        this.logger.log(`card: ${JSON.stringify(card)}`);
        return card ?? false;
    }

    @Post('/create-card')
    @HttpCode(201)
    async createPaymentSource(@Body() card: CardDto) {
        const { rider_id, card: dat } = card;
        this.logger.log(`createPaymentSource`);
        const paymentSource = await this.bl.createCard( dat, rider_id );
        this.logger.log(`paymentSource: ${JSON.stringify(paymentSource)}`);
        return paymentSource;
    }

    @Post('/pay')
    @HttpCode(201)
    async pay(@Body() body: paymentSourceDto) {
        const { installment, card_id, travel_id } = body;
        this.logger.log(`pay`);
        const pay = await this.bl.payTravel( installment, card_id, travel_id );
        this.logger.log(`pay: ${JSON.stringify(pay)}`);
        return pay;
    }

    @Post('/finish')
    @HttpCode(200)
    async finishRide(@Body() body: getTravelDTO ) {
        try {
            const { travel_id } = body;
            this.logger.log(`finishRide`);
            const finish = await this.bl.finishTravel(travel_id);
            this.logger.log(`finish: ${JSON.stringify(finish)}`);
            return finish;
        }catch (e) {

            console.log(e);
        }
    }
}
