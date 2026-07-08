const SESSION_KEY = "shieldpme_session";

const readSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const DB = {
  getSession: () => readSession(),

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  login: (email, password) => {
    // mock: qualquer senha serve; em produção, trocar por API.
    if (!email || !password) return { ok: false, msg: "Preencha todos os campos." };

    const user = {
      id: "u_1",
      name: "Usuário Demo",
      email,
      plan: null,
    };

    writeSession({ user });
    return { ok: true, user };
  },

  register: (name, email, password, cnpj) => {
    if (!name || !email || !password) return { ok: false, msg: "Preencha todos os campos." };
    const user = {
      id: "u_1",
      name,
      email,
      plan: null,
      cnpj: cnpj || null,
    };
    writeSession({ user });
    return { ok: true, user };
  },

  resetPassword: (email, newPassword) => {
    if (!email || !newPassword) return { ok: false, msg: "Preencha todos os campos." };
    if (String(newPassword).length < 6) return { ok: false, msg: "Senha deve ter pelo menos 6 caracteres." };
    return { ok: true, msg: "ok" };
  },

  setPlan: (userId, planName) => {
    const session = readSession();
    if (!session?.user) return;
    session.user.userId = userId;
    session.user.plan = planName;
    writeSession(session);
  },
};

export default DB;

