import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Rider, User } from "@prisma/client";

@Injectable()
export class RiderService {
    constructor(private readonly prisma: PrismaClient) {}

    async getRiders(): Promise<Rider[]> {
        return await this.prisma.rider.findMany();
    }

    async getRiderById(id: number): Promise<Rider> {
        return await this.prisma.rider.findUnique({where: {id}});
    }

    async createRider(data: Prisma.RiderCreateInput): Promise<Rider> {
        return await this.prisma.rider.create({data});
    }

    async updateRider(id: number, data: Prisma.RiderUpdateWithoutCardInput): Promise<Rider> {
        return await this.prisma.rider.update({where: {id}, data});
    }

    async deleteRider(id: number):  Promise<Rider> {
        return await this.prisma.rider.delete({where: {id}});
    }

}
