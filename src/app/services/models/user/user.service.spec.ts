import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {Prisma} from "@prisma/client";

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    // const dataUser: Prisma.UserCreateInput = {
    //
    // }
    // service.createUser()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
