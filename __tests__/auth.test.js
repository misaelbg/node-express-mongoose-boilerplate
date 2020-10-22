import bcrypt from 'bcryptjs';
import app from '../src/app';
import request from 'supertest';

describe('Authentication', () => {
  it("should authenticate with valid credentials", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        email: 'misa-er@hotmail.com',
        senha: "123456"
      });

    expect(response.status).toBe(200);
  });
});
