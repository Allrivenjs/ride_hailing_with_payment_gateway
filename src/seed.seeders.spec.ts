import {Card, Prisma, PrismaClient} from "@prisma/client";
import { faker } from '@faker-js/faker';


describe('create seeders for test.', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
  });

  it("should create user",async function() {

    const fakerUser = () => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      lastname: faker.name.lastName(),
    });

    Array.from({length: 10}).forEach(async () => {
      const user = await prisma.user.create({
        data: fakerUser(),
      });
    });
  });

  it("should create rider",async function() {
      Array.from({length: 10}).forEach(async (value, index) => {
        const rider = await prisma.rider.create({
          data: {
            user: {
              connect: {
                id: index + 1,
              },
            },
            form_payment:"CREDIT_CARD",
          },
        });
      });
  });

  it("should create driver", function() {
    Array.from({length: 10}).forEach(async (value, index) => {
      const rider = await prisma.driver.create({
        data: {
          user: {
            connect: {
              id: index + 1,
            },
          },
        },
      });
    });
  });

});