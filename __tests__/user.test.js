import bcrypt from 'bcryptjs';
import faker from 'faker';
import dbHandler from './db-handler';
import User from '../src/app/models/User';

describe('User', () => {
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
  * Tests whether the encryption generated for the password is correct
  */
  it('should encrypt user password', async () => {
    const user = new User(mockUser);

    await user.save();

    const compareHash = await bcrypt.compare(mockUser.senha, user.senha);

    expect(compareHash).toBe(true);
  });

  /** 
  * Test the difference in minutes between two dates
  */
  it('should be compare time difference', async () => {
    const user = new User(mockUser);
    // Set fake last login date-time
    user.lastLogin = "2020-10-23T12:42:01.044Z";
    // Comparision date-time
    const compareDateTime = new Date("2020-10-23T12:45:01.044Z");
    
    const minutes = user.lastLoginBefore(compareDateTime);

    expect(minutes).toBe(3);
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