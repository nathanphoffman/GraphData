import { type FormEvent, type ReactNode, useState } from "react";
import { useAuth } from "./useAuth";

/** Username and password form. */
function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => Promise<void> }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Stop the page reloading, then try to log in and show the problem if it fails.
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    onLogin(username, password).catch((problem: Error) => setError(problem.message));
  };

  return (
    <form className="login-form" onSubmit={submit}>
      <input value={username} onChange={(changeEvent) => setUsername(changeEvent.target.value)} placeholder="Username" autoComplete="username" />
      <input type="password" value={password} onChange={(changeEvent) => setPassword(changeEvent.target.value)} placeholder="Password" autoComplete="current-password" />
      <button type="submit">Log in</button>
      {error && <span className="login-error">{error}</span>}
    </form>
  );
}

/** Shows the login form until someone is logged in, then shows `children` with the username and a way to log out. */
export function AuthGate({ auth, children }: { auth?: ReturnType<typeof useAuth>; children: (user: string, logout: () => void) => ReactNode }) {
  const ownAuth = useAuth();
  const { user, login, logout } = auth ?? ownAuth;

  if (user === undefined) return null;

  if (user === null) return <LoginForm onLogin={login} />;

  return <>{children(user, () => void logout())}</>;
}
