// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";
import { auth } from "../api/api"; // expects api.ts to export auth object

export const AuthContext = createContext<any>(null);

// --- small helper to check if an id looks like a Mongo ObjectId ---
const isValidObjectIdLike = (id: any) =>
  typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

// --- normalize user so we always have user._id and user.id ---
const normalizeUser = (u: any | null) => {
  if (!u) return null;

  const rawId = u._id ?? u.id ?? u.userId;

  // if id is missing or clearly bogus (like "<id>"), treat as no user
  if (!isValidObjectIdLike(rawId)) {
    return null;
  }

  const id = String(rawId);
  return { ...u, _id: id, id };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // --- initial user from localStorage, but sanitized ---
  const [user, setUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const normalized = normalizeUser(parsed);
      return normalized;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // if we already have a valid user in state, we can finish quickly
    if (!token) {
      setLoading(false);
      return;
    }

    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // If your backend has /auth/me, this will fetch the current user
    if (auth.me) {
      auth
        .me()
        .then((res) => {
          const u = res.data.user ?? res.data;
          const normalized = normalizeUser(u);

          if (!normalized) {
            // token no longer valid or user malformed; log out
            logout();
            return;
          }

          setUser(normalized);
          try {
            localStorage.setItem("user", JSON.stringify(normalized));
          } catch {}
          window.dispatchEvent(
            new CustomEvent("auth:changed", { detail: { user: normalized } })
          );
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    const onLogout = () => logout();
    window.addEventListener("auth:logout", onLogout as EventListener);
    return () => window.removeEventListener("auth:logout", onLogout as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAuthToken = (t: string | null) => {
    if (t) {
      client.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    } else {
      delete client.defaults.headers.common["Authorization"];
    }
    setToken(t);
  };

  const login = async (email: string, password: string) => {
    const res = await auth.login(email, password);
    const data = res.data;
    const t = data.token;
    const u = data.user ?? data; // some backends just return the user

    if (t) {
      try {
        localStorage.setItem("token", t);
      } catch {}
      setAuthToken(t);
    }

    const normalized = normalizeUser(u);
    if (!normalized) {
      // something is wrong with the backend response
      console.warn("Auth login: could not normalize user", u);
      return null;
    }

    try {
      localStorage.setItem("user", JSON.stringify(normalized));
    } catch {}
    setUser(normalized);

    // broadcast auth state change
    window.dispatchEvent(
      new CustomEvent("auth:changed", { detail: { user: normalized } })
    );

    return normalized;
  };

  const register = async (payload: any) => {
    const res = await auth.register(payload);
    const data = res.data;
    const t = data.token;
    const u = data.user ?? data;

    if (t) {
      try {
        localStorage.setItem("token", t);
      } catch {}
      setAuthToken(t);
    }

    const normalized = normalizeUser(u);
    if (!normalized) {
      console.warn("Auth register: could not normalize user", u);
      return null;
    }

    try {
      localStorage.setItem("user", JSON.stringify(normalized));
    } catch {}
    setUser(normalized);

    // mark that the user just registered so Dashboard can show the one-time welcome
    try {
      localStorage.setItem("justRegistered", "true");
    } catch (err) {
      console.warn("Could not set justRegistered flag:", err);
    }

    // broadcast auth state change
    window.dispatchEvent(
      new CustomEvent("auth:changed", { detail: { user: normalized } })
    );

    return normalized;
  };

  // alias for compatibility if components call signup(...)
  const signup = register;

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("justRegistered");
    } catch {}
    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Named export so files that do:
 *   import { useAuth } from '../contexts/AuthContext';
 * keep working.
 *
 * Also keeps the separate hook at src/hooks/useAuth.ts intact.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
};

export default AuthContext;
