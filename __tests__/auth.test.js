import request from 'supertest';
import faker from 'faker';
import UserModel from '../src/app/models/User';
import dbHandler from './db-handler';
import app from '../src/app';

describe('Authentication', () => {
  /**
  * Connect to a new in-memory database before running any tests.
  */
  beforeAll(async () => await dbHandler.connect());

  /**
  * Clear all test data after every test.
  */
  afterEach(async () => await dbHandler.clearDatabase());

  /**
  * Remove and close the db and server.
  */
  afterAll(async () => await dbHandler.closeDatabase());

  /**
  * Tests that a valid user can be created.
  */
it("should create a new user", async () => {
    const response = await request(app)
      .post("/signup")
      .send(mockUser);

    expect(response.status).toBe(200);
  });

  /**
  * Tests whether an existing user can be created
  */
it("should not create a new user if already exists", async () => {
    const user = new UserModel(mockUser);

    await user.save();

    const response = await request(app)
      .post("/signup")
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'E-mail já existente'
      })
    );
  });

  /**
  * Test if a valid user can login without errors
  */
it("should authenticate with valid credentials", async () => {
    const user = new UserModel(mockUser);

    await user.save();

    const response = await request(app)
      .post("/signin")
      .send(mockUser);

    expect(response.status).toBe(200);
  });

  /**
  * Test if a invalid user can login
  */
it("should not authenticate with invalid credentials", async () => {
    const response = await request(app)
      .post("/signin")
      .send(mockUser);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Usuário e/ou senha inválidos'
      })
    );
  });

  /**
  * Test whether token is being generated after login
  */
it("should return jwt token when authenticated", async () => {
    const user = new UserModel(mockUser);

    await user.save();

    const response = await request(app)
      .post("/signin")
      .send(mockUser);

    expect(response.body).toHaveProperty("token", expect.any(String));
  });

});

/**
* Complete user example.
*/
const mockUser = {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
  telefones: [
    {
      numero: faker.phone.phoneNumber(),
      ddd: "11"
    }
  ]
};
