import { Injectable } from '@nestjs/common';
import {Driver, Prisma, PrismaClient} from "@prisma/client";

@Injectable()
export class DriverService {
    constructor(private readonly prisma: PrismaClient) {}

    async createDriver(data: Prisma.DriverCreateInput): Promise<Driver> {
        return await this.prisma.driver.create({data});
    }

    async getDriverById(id: number): Promise<Driver> {
        return await this.prisma.driver.findUnique({where: {id}});
    }

    async updateDriver(id: number, data: Prisma.DriverCreateInput): Promise<Driver> {
        return await this.prisma.driver.update({where: {id}, data});
    }

    async deleteDriver(id: number):  Promise<Driver> {
        return await this.prisma.driver.delete({where: {id}});
    }

    async getDrivers(): Promise<Driver[]> {
        return await this.prisma.driver.findMany();
    }


}
