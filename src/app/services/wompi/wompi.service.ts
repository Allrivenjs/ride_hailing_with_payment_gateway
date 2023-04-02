import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ray } from "node-ray";
import { CardService } from "../models/card/card.service";
import { Card, Prisma } from "@prisma/client";

export interface WompiCardData {
    "number": string,
    "exp_month": string,
    "exp_year": string,
    "cvc": string,
    "card_holder": string,
}

export interface WompichargeData {
    "currency": string,
    "amount_in_cents": number,
    "customer_email": string,
    "payment_method": {
        "type": string,
        "installments": number,
        "token": string
    },
    "reference": string,
    "acceptance_token": string
}


@Injectable()
export class WompiService {
    private readonly url = 'https://sandbox.wompi.co/v1'
    private readonly keypub = "pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf";
    private readonly headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.keypub,
    }


    constructor(private readonly httpService: HttpService, private readonly card: CardService) {}

//     curl --location --request POST 'https://sandbox.wompi.co/v1/tokens/cards' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer {{API_KEY}}' \
// --data-raw '{
//     "number": "4242424242424242",
//     "exp_month": "12",
//     "exp_year": "30",
//     "cvc": "123",
//     "card_holder": "José Pérez"
// }'

    async createToken(d: WompiCardData, RiderId: number): Promise<Card> {
        const { data } = await this.httpService.axiosRef.post(`${this.url}/tokens/cards`, d, { headers: this.headers });
        const card: Prisma.CardCreateInput   = {
            card_type: data.data.brand,
            last_digits: data.data.last_four,
            expiration_date: `${data.data.exp_month}/${data.data.exp_year}`,
            token_card: data.data.id,
            token_expiration: data.data.expires_at,
            rider: {
                connect: {id: RiderId}
            },
            payload: JSON.stringify(data)
        }
        return await this.card.createCard(card);
    }

// example of the data to send to the wompi api in python
    // import requests
    // import json
    //
    // url = "https://sandbox.wompi.co/v1/transactions"
    //
    // payload = {
    //     "currency": "COP",
    //     "amount_in_cents": 1000000,
    //     "customer_email": "customer@example.com",
    //     "payment_method": {
    //         "type": "CARD",
    //         "installments": 1,
    //         "token":"tok_test_1_eB8bF2117ca4C21d3510Da1061a9ee58"
    //     },
    //     "reference":"asdsadasdasdasdadsa12",
    //     "acceptanc e_token":"eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6NiwicGVybWFsaW5rIjoiaHR0cHM6Ly93b21waS5jb20vd2NtL2Nvbm5lY3QvYzkyYmJlYjMtMzQyMS00OWQwLWI4MWUtNGE4ZTRlNTUyYWY5L1QlQzMlQTlybWlub3MreStjb25kaWNpb25lc19Ob3ZpZW1icmUucGRmP01PRD1BSlBFUkVTIiwiZmlsZV9oYXNoIjoiYmY3MjJhY2QxMWM0YzM0MzE1YzA4NTViMjJiMjhiOTkiLCJqaXQiOiIxNjgwNDExMDI2LTg1NjYxIiwiZXhwIjoxNjgwNDE0NjI2fQ.-DsDWTjil_VW48x9d0RHGQEwBPTVW1uLLlfuCQCL_8k"
    // }
    //
    // headers = {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Authorization': 'Bearer pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf'
    // }
    //
    // response = requests.post(url, headers=headers, data=json.dumps(payload))
    //
    // print(response.json())

    async createCharge(d: WompichargeData) {
        const { data } = await this.httpService.axiosRef
          .post(`${this.url}/transactions`, d,
            {
                headers: this.headers
            }
          );

        ray(data)
        return data;

    }

    async getMerchant() {
        const { data: { data: { presigned_acceptance } } } = await this.httpService.axiosRef
          .get(`${this.url}/merchants/${this.keypub}`,
            {
                headers: this.headers
            }
          );
        // ray(presigned_acceptance)
        return presigned_acceptance;
    }



}
