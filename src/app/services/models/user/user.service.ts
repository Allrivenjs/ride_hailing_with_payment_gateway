import { Injectable } from '@nestjs/common';
import {Prisma, User, PrismaClient} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaClient) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({ data });
    }

    async getUserById(id: number): Promise<User> {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return await this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number):  Promise<User> {
        return await this.prisma.user.delete({ where: { id } });
    }

    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

}
