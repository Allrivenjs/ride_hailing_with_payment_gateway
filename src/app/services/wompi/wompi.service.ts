import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { ray } from "node-ray";
import { CardService } from "../models/card/card.service";
import { Prisma } from "@prisma/client";

export interface WompiCardData {
    "number": string,
    "exp_month": string,
    "exp_year": string,
    "cvc": string,
    "card_holder": string,
}

export interface WompichargeData {
    "amount_in_cents": number,
    "currency": string,
    "customer_email": string,
    "payment_method": {
        "installments": number,
        "type": string,
        "token": string
    }
}


@Injectable()
export class WompiService {
    private readonly url = 'https://sandbox.wompi.co/v1'
    private readonly headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf'
    }


    constructor(private readonly httpService: HttpService, private readonly card: CardService) {}


    async createToken(d: WompiCardData, RiderId: number) {
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
        await this.card.createCard(card)
        return data;
    }


    async createCharge(d: WompichargeData) {
        const { data } = await this.httpService.axiosRef.post(`${this.url}/tokens/cards`, d, { headers: this.headers });
        return data;
    }



}
