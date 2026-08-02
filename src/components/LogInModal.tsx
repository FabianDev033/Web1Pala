import { type FormEvent, useState } from 'react';
import { User, CloseMenu } from '../icons';
import { login, register } from '../services/auth';
import { clearSession, type AuthSession } from '../utils/auth';

interface LoginModalProps {
  onClose: () => void;
  session: AuthSession | null;
  onSync: () => Promise<void>;
  onAccountCreated: () => void;
}

export default function LoginModal({ onClose, session, onSync, onAccountCreated }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const switchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode);
    setError('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage('');

    try {
      await onSync();
      setSyncMessage('Estadísticas sincronizadas correctamente.');
    } catch (requestError) {
      setSyncMessage(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudieron sincronizar las estadísticas.',
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('El usuario debe tener al menos 3 caracteres.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (mode === 'register' && password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(username.trim(), password);
      } else {
        await register(username.trim(), password);
        onAccountCreated();
      }
      onClose();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudo completar la solicitud.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (session) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-title"
          className="relative w-full max-w-[380px] rounded-xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 cursor-pointer text-zinc-500 transition hover:text-white"
          >
            <CloseMenu className="w-4 md:w-5" />
          </button>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
              <User className="w-7 text-zinc-200" />
            </div>
            <h2 id="account-title" className="text-2xl font-Lato text-stone-50">
              {session.user.username}
            </h2>
            <div className='w-full font-Manrope text-stone-50 font-normal flex flex-col gap-3 items-start mt-7'>
              <p className='font-Lato'>Sincroniza tus datos!</p>
              <button
                type="button"
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full cursor-pointer rounded-lg border border-zinc-600 py-3 font-light text-zinc-100 transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-60"
              >
                {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
              </button>
              {syncMessage && (
                <p
                  role="status"
                  className="text-sm text-zinc-300"
                >
                  {syncMessage}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              clearSession();
              onClose();
            }}
            className="mt-7 w-full cursor-pointer rounded-lg border border-zinc-600 py-3 font-light font-Manrope text-zinc-100 transition hover:bg-zinc-800"
          >
            Cerrar sesión
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="relative w-full max-w-[380px] rounded-xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 cursor-pointer text-zinc-500 transition hover:text-white"
        >
          <CloseMenu className="w-4 md:w-5" />
        </button>
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
            <User className="w-7 text-zinc-200" />
          </div>
          <h2 id="login-title" className="text-2xl font-Lato text-white">
            {mode === 'login' ? 'Iniciar sesión' : 'Registrate'}
          </h2>
          <p className="mt-1 text-sm font-Manrope text-zinc-400">
            Guardá tus estadísticas
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-Manrope text-zinc-300" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              minLength={3}
              maxLength={45}
              required
              disabled={isSubmitting}
              placeholder="Fabian"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-Manrope text-zinc-300" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={8}
              required
              disabled={isSubmitting}
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>
          {mode === 'register' && (
            <div>
              <label className="mb-2 block text-sm text-Manrope text-zinc-300" htmlFor="password-confirmation">
                Repetir contraseña
              </label>
              <input
                id="password-confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                disabled={isSubmitting}
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>
          )}
          {error && (
            <p role="alert" className="rounded-md bg-red-950/50 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-lg bg-white py-3 font-semibold text-Lato text-black transition hover:bg-zinc-200 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting
              ? 'Procesando...'
              : mode === 'login'
                ? 'Iniciar sesión'
                : 'Crear cuenta'}
          </button>
        </form>
        {mode === 'login' ? (
          <p className="mt-6 text-center text-sm text-zinc-400">
            ¿No tenés cuenta?
            <button
              type="button"
              className="ml-1 cursor-pointer text-white underline"
              onClick={() => switchMode('register')}
            >
              Registrarse
            </button>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-zinc-400">
            ¿Ya tenés una cuenta?
            <button
              type="button"
              className="ml-1 cursor-pointer text-white underline"
              onClick={() => switchMode('login')}
            >
              Iniciar sesión
            </button>
          </p>
        )}
      </section>
    </div>
  );
}
