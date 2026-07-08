import { useState } from "react";
import DB from "../services/DB";


export default function AuthModal({ defaultTab, onClose, onLogin }) {
  const [tab, setTab] = useState(defaultTab);
  const [mode, setMode] = useState("auth"); // "auth" | "reset"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", cnpj: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const reset = () => {
    setError("");
    setSuccess("");
  };

  const handle = async () => {
    reset();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    if (mode === "reset") {
      if (!form.email || !form.password) {
        setError("Preencha todos os campos.");
        setLoading(false);
        return;
      }
      const res = DB.resetPassword(form.email, form.password);
      if (!res.ok) {
        setError(res.msg);
        setLoading(false);
        return;
      }
      setSuccess("Senha alterada! Faça login.");
      setMode("auth");
      setTab("login");
      setLoading(false);
      return;
    }

    if (tab === "login") {
      if (!form.email || !form.password) {
        setError("Preencha todos os campos.");
        setLoading(false);
        return;
      }
      const res = DB.login(form.email, form.password);
      if (!res.ok) {
        setError(res.msg);
        setLoading(false);
        return;
      }
      onLogin(res.user);
      onClose();
      return;
    }

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }
    if (form.password !== form.confirm) {
      setError("Senhas não coincidem.");
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const res = DB.register(form.name, form.email, form.password, form.cnpj);
    if (!res.ok) {
      setError(res.msg);
      setLoading(false);
      return;
    }
    onLogin(res.user);
    onClose();
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {mode === "reset" ? (
          <>
            <div className="modal-title">Recuperar Senha</div>
            <div className="modal-sub">Digite seu e-mail e a nova senha desejada.</div>

            <div className="form-group">
              <label className="form-label">E-mail cadastrado</label>
              <input
                className="form-input"
                type="email"
                placeholder="voce@empresa.com"
                value={form.email}
                onChange={set("email")}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nova senha</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
              />
            </div>

            {error && <span className="form-error">{error}</span>}
            {success && <span className="form-success">{success}</span>}

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              onClick={handle}
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Redefinir Senha"}
            </button>

            <div className="form-footer">
              <span
                className="form-link"
                onClick={() => {
                  setMode("auth");
                  reset();
                }}
              >
                ← Voltar ao login
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="auth-tabs">
              <button
                className={`auth-tab${tab === "login" ? " active" : ""}`}
                onClick={() => {
                  setTab("login");
                  reset();
                }}
              >
                Entrar
              </button>
              <button
                className={`auth-tab${tab === "register" ? " active" : ""}`}
                onClick={() => {
                  setTab("register");
                  reset();
                }}
              >
                Criar Conta
              </button>
            </div>

            {tab === "login" ? (
              <>
                <div className="form-group">
                  <label className="form-label">E-mail corporativo</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="voce@empresa.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Senha</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={set("password")}
                  />
                </div>
                <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                  <span
                    className="form-link"
                    onClick={() => {
                      setMode("reset");
                      reset();
                    }}
                  >
                    Esqueci minha senha
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Nome completo</label>
                  <input
                    className="form-input"
                    placeholder="João da Silva"
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail corporativo</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="voce@empresa.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CNPJ (opcional)</label>
                  <input
                    className="form-input"
                    placeholder="00.000.000/0001-00"
                    value={form.cnpj}
                    onChange={set("cnpj")}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Senha</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={set("password")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirmar</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={set("confirm")}
                    />
                  </div>
                </div>
              </>
            )}

            {error && <span className="form-error">{error}</span>}
            {success && <span className="form-success">{success}</span>}

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
              onClick={handle}
              disabled={loading}
            >
              {loading ? "Aguarde..." : tab === "login" ? "Entrar na Conta" : "Criar Minha Conta"}
            </button>

            <div className="form-footer">
              {tab === "login" ? (
                <>
                  Não tem conta?{" "}
                  <span
                    className="form-link"
                    onClick={() => {
                      setTab("register");
                      reset();
                    }}
                  >
                    Criar agora
                  </span>
                </>
              ) : (
                <>
                  Já tem conta?{" "}
                  <span
                    className="form-link"
                    onClick={() => {
                      setTab("login");
                      reset();
                    }}
                  >
                    Entrar
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

