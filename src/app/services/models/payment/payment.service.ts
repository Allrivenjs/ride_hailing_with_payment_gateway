import { Injectable } from '@nestjs/common';
import { Payment, Prisma, PrismaClient } from "@prisma/client";
@Injectable()
export class PaymentService {

  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({ data });

    // return this.prisma.$executeRaw(
    //   Prisma.sql`INSERT INTO public."Payment" (id,amount,currency,status,reference,travel_id,created_at,updated_at) VALUES (DEFAULT,${data.amount},${data.currency},${data.status},${data.reference},${data.travel.connect.id},NOW(),NOW()) RETURNING *;`
    // );
  }

  async findUnique(id: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { id } });
  }


  async getPaymentByTravelId(travel_id: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { travel_id } });
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
