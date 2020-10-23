import request from 'supertest';
import faker from 'faker';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import UserModel from '../src/app/models/User';
import app from '../src/app';

describe('Authentication', () => {
  let testDatabase;

  beforeAll(async () => {
    testDatabase = new MongoMemoryServer();
    const mongoUri = await testDatabase.getUri();

    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await testDatabase.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany();
    }
  });

  it("should create a new user", async () => {
    const mockUser = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    };

    const response = await request(app)
      .post("/signup")
      .send(mockUser);

    expect(response.status).toBe(200);
  });

  it("should not create a new user if already exists", async () => {
    const mockUser = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    };

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

  it("should authenticate with valid credentials", async () => {
    const mockUser = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    };

    const user = new UserModel(mockUser);

    await user.save();

    const response = await request(app)
      .post("/signin")
      .send(mockUser);

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        email: faker.internet.email(),
        senha: faker.internet.password()
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Usuário e/ou senha inválidos'
      })
    );
  });

  it("should return jwt token when authenticated", async () => {
    const mockUser = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    };

    const user = new UserModel(mockUser);

    await user.save();

    const response = await request(app)
      .post("/signin")
      .send(mockUser);

    expect(response.body).toHaveProperty("token", expect.any(String));
  });

});
