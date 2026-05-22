// authHelper.js
import request from 'supertest';
import app from '../app.js';

/**
 * Registers a test user (if not already existing) and returns a JWT token.
 */
export async function getTestToken() {
  const email = 'testuser@example.com';
  const password = 'Password123';

  // Try to register – ignore duplicate error
  try {
    await request(app)
      .post('/api/auth')
      .send({
        documento: '123456789',
        nombres_apellidos: 'Test User',
        email,
        password,
        rol: 'usuario'
      });
  } catch (e) {
    // Ignore if already exists
  }

  // Login to obtain token
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email, password });

  if (loginRes.status !== 200) {
    throw new Error('Login failed: ' + JSON.stringify(loginRes.body));
  }
  return loginRes.body.token;
}
