const SESSION_KEY = 'auth-session';
const SESSION_EVENT = 'auth-session-changed';

export type AuthSession = {
  token: string;
  user: {
    id: number;
    username: string;
  };
};

export function getSession(): AuthSession | null {
  const value = localStorage.getItem(SESSION_KEY);
  if (!value) return null;

  try {
    const session = JSON.parse(value) as Partial<AuthSession>;
    if (
      typeof session.token !== 'string' ||
      typeof session.user?.id !== 'number' ||
      typeof session.user.username !== 'string'
    ) {
      throw new Error('Sesion invalida');
    }

    return session as AuthSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function notifySessionChange() {
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notifySessionChange();
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  notifySessionChange();
}

export function subscribeToSession(callback: () => void) {
  window.addEventListener(SESSION_EVENT, callback);
  return () => window.removeEventListener(SESSION_EVENT, callback);
}
