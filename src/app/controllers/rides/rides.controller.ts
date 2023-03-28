import { Controller, Post, Body } from '@nestjs/common';
import {WompiService} from "../../services/wompi/wompi.service";
import {CalculateService} from "../../services/calculate/calculate.service";

@Controller('rides')
export class RidesController {
    constructor(private readonly wompiService: WompiService, private readonly c: CalculateService) {}

    @Post('/payment-source')
    async createPaymentSource(@Body() body: { customerEmail: string, token: string }) {
        const { customerEmail, token } = body;
        const paymentSourceId = await this.wompiService.createPaymentSource(customerEmail, token);
        return { paymentSourceId };
    }

    @Post('/finish')
    async finishRide(@Body() body: { rideId: string, finalLocation: { lat1: number, lon1: number, lat2: number, lon2: number } }) {
        const { rideId, finalLocation: { lat1, lat2, lon2, lon1 } } = body;
        const distance = this.c.calculateDistance( lat1, lon1, lat2, lon2 );
        const rideDuration = this.c.calculateDuration(rideId);
        const totalAmount = this.c.calculateAmount(distance, rideDuration);

        //crear funcion. obtener el ID de la fuente de pago del ciclista
        const paymentSourceId = await getPaymentSourceId(rideId); // obtener el ID de la fuente de pago del ciclista
        const transactionId = await this.wompiService.createTransaction(
            paymentSourceId,
            totalAmount,
            'COP',
            `Pago por servicio de transporte ${rideId}`,
        );

        // actualizar estado del viaje y registrar transacción en la base de datos

        return { transactionId };
    }
}
