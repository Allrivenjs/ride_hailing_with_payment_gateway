import { Injectable } from '@nestjs/common';
import {Card, Prisma, PrismaClient} from "@prisma/client";

@Injectable()
export class CardService {
    constructor(private readonly prisma: PrismaClient) {}

    async getCards(): Promise<Card[]> {
        return await this.prisma.card.findMany();
    }

    async getCardById(id: number): Promise<Card> {
        return await this.prisma.card.findUnique({where: {id}});
    }

    async createCard(data: Prisma.CardCreateInput): Promise<Card> {
        return await this.prisma.card.create({data});
    }

    async updateCard(id: number, data: Prisma.CardUpdateInput): Promise<Card> {
        return await this.prisma.card.update({where: {id}, data});
    }

    async deleteCard(id: number):  Promise<Card> {
        return await this.prisma.card.delete({where: {id}});
    }

}
