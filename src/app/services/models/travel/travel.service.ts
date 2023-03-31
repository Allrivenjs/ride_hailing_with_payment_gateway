import { Injectable } from '@nestjs/common';
import {Prisma, PrismaClient, Travel} from "@prisma/client";

@Injectable()
export class TravelService {
    constructor(private readonly prisma: PrismaClient) {}

    async createTravel(data: Prisma.TravelCreateInput): Promise<Travel> {
        return await this.prisma.travel.create({data});
    }

    async getTravelById(id: number): Promise<Travel> {
        return await this.prisma.travel.findUnique({where: {id}});
    }

    async updateTravel(id: number, data: Prisma.TravelUpdateInput): Promise<Travel> {
        return await this.prisma.travel.update({where: {id}, data});
    }

    async deleteTravel(id: number):  Promise<Travel> {
        return await this.prisma.travel.delete({where: {id}});
    }

    async getTravels(): Promise<Travel[]> {
        return await this.prisma.travel.findMany();
    }

}
