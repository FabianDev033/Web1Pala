import { useEffect, useState } from 'react';
import {
  getSession,
  subscribeToSession,
  type AuthSession,
} from '../utils/auth';

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(() => getSession());

  useEffect(() => subscribeToSession(() => setSession(getSession())), []);

  return session;
}
