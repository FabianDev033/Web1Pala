import { request } from './api';
import { saveSession, type AuthSession } from '../utils/auth';

async function authenticate(path: '/auth/register' | '/auth/login', username: string, password: string) {
  const session = await request<AuthSession>(path, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  saveSession(session);
  return session;
}

export const register = (username: string, password: string) =>
  authenticate('/auth/register', username, password);

export const login = (username: string, password: string) =>
  authenticate('/auth/login', username, password);
