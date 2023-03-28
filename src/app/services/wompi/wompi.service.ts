import { Injectable } from '@nestjs/common';
import axiosClient, {env} from "../../../config/axios/AxiosServices";

@Injectable()
export class WompiService {
    async createPaymentSource(customerEmail: string, token: string){
        const url = `/customers`;
        const response = await axiosClient.post(url, {
            email: customerEmail,
            source: {
                type: "CARD",
                token: token
            }
        },
            {
                auth: {
                    username: env.WOMPI_PRIVATE_KEY,
                    password: "",
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'MyApp/1.0.0',
                    'Authorization': `Bearer ${env.WOMPI_PUBLIC_KEY}`,
                }
            }
        );
        console.log(response.data.data.id);
        return response.data.data.id;
    }

    async createTransaction(
        paymentSourceId: string,
        amount: number,
        currency: string,
        description: string,
    ){
        const url = `/transactions`;
        const response = await axiosClient.post(url, {
            payment_source_id: paymentSourceId,
            amount_in_cents: amount * 100,
            currency: currency,
            description: description,
        },
            {
                auth: {
                    username: env.WOMPI_PRIVATE_KEY,
                    password: "",
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'MyApp/1.0.0',
                    'Authorization': `Bearer ${env.WOMPI_PUBLIC_KEY}`,
                }
            }
        );
        console.log(response.data.data.id);
        return response.data.data.id;
    }
}
