import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Prisma, PrismaClient, User } from "@prisma/client";

describe('UserService', () => {
  let service: UserService;
  let _user: User;
  const dataUser: Prisma.UserCreateInput = {
    name: 'test',
    lastname: 'test',
    email: 'test@gmail.com',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaClient],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create", function() {
    service.createUser(dataUser).then((user) => {
      expect(user).toBeDefined();
      expect(user).toEqual({
        id: expect.any(Number),
        ...dataUser
      });
      _user = user;
    });
  });

  it("should get", function() {
    service.getUserById(_user.id).then((userFound) => {
      expect(userFound).toBeDefined();
    });
  });

  it("should get all", function() {
    service.getUsers().then((cards) => {
      expect(cards).toBeDefined();
    });
  });

  it("should update", function() {
    service.updateUser(_user.id, dataUser).then((userUpdated) => {
      expect(userUpdated).toBeDefined();
      expect(userUpdated).toEqual({
        id: expect.any(Number),
        ...dataUser
      });
    });
  });

  it("should delete", function() {
    // service.deleteUser(user.id).then((userDeleted) => {
    //   expect(userDeleted).toBeDefined();
    // });
  });

});
