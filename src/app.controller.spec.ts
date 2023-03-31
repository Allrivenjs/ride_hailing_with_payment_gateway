import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// describe('AppController', () => {
//   let appController: AppController;
//
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService],
//     }).compile();
//
//     appController = app.get<AppController>(AppController);
//   });
//
//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
//

const { Pool } = require('pg');
//npm test  app.controller.spec.ts
describe('testing postgres', () => {

  let pgPool;

  beforeAll(() => {
    console.log(process.env.DATABASE_URL);

  });

  afterAll(async () => {
    await pgPool.end();
  });

  it('should test', async () => {
    pgPool = new Pool({
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    // process.env.DATABASE_URL
    const client = await pgPool.connect();
    console.log(client);
    try {
      await client.query('BEGIN');

      const { rows } = await client.query('SELECT 1 AS "result"');
      expect(rows[0]["result"]).toBe(1);

      await client.query('ROLLBACK');
    } catch(err) {
      throw err;
    } finally {
      client.release();
    }

  })

});