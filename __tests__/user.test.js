import bcrypt from 'bcryptjs';
import faker from 'faker';
import User from '../src/app/models/User';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

describe('User', () => {
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

  it('should encrypt user password', async () => {
    const mockUser = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password()
    };

    const user = new User(mockUser);

    await user.save();

    const compareHash = await bcrypt.compare(mockUser.senha, user.senha);

    expect(compareHash).toBe(true);
  });
});
