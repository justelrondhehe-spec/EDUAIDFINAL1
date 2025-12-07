import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";
import { auth } from "../api/api";

export const AuthContext = createContext<any>(null);

const isValidObjectIdLike = (id: any) =>
  typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

const normalizeUser = (u: any | null) => {
  if (!u) return null;
  const rawId = u._id ?? u.id ?? u.userId;
  if (!isValidObjectIdLike(rawId)) return null;
  const id = String(rawId);
  return { ...u, _id: id, id };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return normalizeUser(JSON.parse(raw));
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

  const setAuthToken = (t: string | null) => {
    if (t) client.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    else delete client.defaults.headers.common["Authorization"];
    setToken(t);
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("justRegistered");
    } catch {}
    setAuthToken(null);
    setUser(null);
    window.dispatchEvent(
      new CustomEvent("auth:changed", { detail: { user: null } })
    );
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (auth.me) {
      auth
        .me()
        .then((res) => {
          const u = res.data.user ?? res.data;
          const normalized = normalizeUser(u);
          if (!normalized) {
            logout();
            return;
          }
          setUser(normalized);
          localStorage.setItem("user", JSON.stringify(normalized));
          window.dispatchEvent(
            new CustomEvent("auth:changed", { detail: { user: normalized } })
          );
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    const onLogout = () => logout();
    window.addEventListener("auth:logout", onLogout as EventListener);
    return () =>
      window.removeEventListener("auth:logout", onLogout as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOGIN – supports 2FA
  const login = async (email: string, password: string) => {
    const res = await auth.login(email, password);
    const data = res.data;

    if (data.require2fa) {
      // Step 1 only – caller will now ask for 2FA code
      return { require2fa: true, tempToken: data.tempToken };
    }

    const t = data.token;
    const u = data.user ?? data;

    if (t) {
      localStorage.setItem("token", t);
      setAuthToken(t);
    }

    const normalized = normalizeUser(u);
    if (!normalized) {
      console.warn("Auth login: could not normalize user", u);
      return { require2fa: false, user: null };
    }

    localStorage.setItem("user", JSON.stringify(normalized));
    setUser(normalized);
    window.dispatchEvent(
      new CustomEvent("auth:changed", { detail: { user: normalized } })
    );

    return { require2fa: false, user: normalized };
  };

  // 2FA verify step
  const verifyTwoFactorLogin = async (code: string, tempToken: string) => {
    const res = await auth.verify2faLogin(code, tempToken);
    const data = res.data;

    const t = data.token;
    const u = data.user ?? data;

    if (t) {
      localStorage.setItem("token", t);
      setAuthToken(t);
    }

    const normalized = normalizeUser(u);
    if (!normalized) {
      console.warn("Auth verify2FA: could not normalize user", u);
      return null;
    }

    localStorage.setItem("user", JSON.stringify(normalized));
    setUser(normalized);
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
      localStorage.setItem("token", t);
      setAuthToken(t);
    }

    const normalized = normalizeUser(u);
    if (!normalized) {
      console.warn("Auth register: could not normalize user", u);
      return null;
    }

    localStorage.setItem("user", JSON.stringify(normalized));
    setUser(normalized);
    localStorage.setItem("justRegistered", "true");

    window.dispatchEvent(
      new CustomEvent("auth:changed", { detail: { user: normalized } })
    );

    return normalized;
  };

  const signup = register;

  const updateUser = (updated: any) => {
    if (!updated) {
      logout();
      return;
    }
    const withId = {
      ...(user || {}),
      ...updated,
      _id: updated._id ?? user?._id,
      id: updated.id ?? user?.id,
    };

    const normalized = normalizeUser(withId);
    if (!normalized) {
      console.warn("Auth updateUser: could not normalize user", withId);
      return;
    }

    setUser(normalized);
    localStorage.setItem("user", JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent("auth:changed", { detail: { user: normalized } })
    );
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
        verifyTwoFactorLogin,
        register,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
};

export default AuthContext;
