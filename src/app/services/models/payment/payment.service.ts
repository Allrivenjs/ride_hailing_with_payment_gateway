import { Injectable } from '@nestjs/common';
import { Payment, Prisma, PrismaClient } from "@prisma/client";
@Injectable()
export class PaymentService {

  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({ data });
  }

  async findUnique(id: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  async update(id: number, data: Prisma.PaymentUpdateInput): Promise<Payment> {
    return this.prisma.payment.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Payment> {
    return this.prisma.payment.delete({ where: { id } });
  }

}
