import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {Prisma, PrismaClient} from "@prisma/client";

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaClient],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('crud of user', () => {
    expect(service).toBeDefined();
    const dataUser: Prisma.UserCreateInput = {
      name: 'test',
      lastname: 'test',
      email: 'test@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const dataUserUpdate: Prisma.UserUpdateInput = {
      ...dataUser,
      name: 'test2',
    }

    service.createUser(dataUser).then((user) => {
      expect(user).toBeDefined();
      expect(user).toEqual({
        id: expect.any(Number),
        ...dataUser
      });

      service.getUserById(user.id).then((userFound) => {
        expect(userFound).toBeDefined();
      });

      service.getUserById(user.id).then((userFound) => {
        expect(userFound).toBeDefined();
      });

      service.updateUser(user.id, dataUserUpdate).then((userUpdated) => {
        expect(userUpdated).toBeDefined();
        expect(userUpdated).toEqual({
          id: expect.any(Number),
          ...dataUserUpdate
        });
      });

      // service.deleteUser(user.id).then((userDeleted) => {
      //   expect(userDeleted).toBeDefined();
      // });

    });
  });
});
