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

  it("should not authenticate with invalid credentials", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        email: 'misa-er@hotmail.com',
        senha: "543216"
      });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        email: 'misa-er@hotmail.com',
        senha: "123456"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        nome: 'Misael',
        email: 'misa-er@hotmail.com',
        senha: "123456"
      });

    expect(response.status).toBe(200);
  });
});
