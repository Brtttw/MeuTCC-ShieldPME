import { useState } from "react";
import DB from "../services/DB";

const fmt = (n) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });


export default function CheckoutModal({ plan, annual, user, onClose, onSuccess, onNeedLogin }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ name: user?.name || "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);

  const price = annual ? plan.annual : plan.monthly;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!user)
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
          <div className="modal-title">Login necessário</div>
          <div className="modal-sub">Entre ou crie uma conta para assinar o plano {plan.name}.</div>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={onNeedLogin}
          >
            Entrar / Criar Conta
          </button>
        </div>
      </div>
    );

  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    DB.setPlan(user.id, plan.name);
    setLoading(false);
    onSuccess(plan.name);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-title">Finalizar Assinatura</div>
        <div className="modal-sub">Plano {plan.name} — Pagamento 100% seguro</div>

        <div className="checkout-steps">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`checkout-step${step > i ? " done" : ""}`} />
          ))}
        </div>

        <div className="plan-summary">
          <div>
            <div className="plan-summary-name">Plano {plan.name}</div>
            <div style={{ fontSize: "0.74rem", color: "var(--muted)", marginTop: "2px" }}>
              {annual ? "Cobrança anual" : "Cobrança mensal"}
            </div>
          </div>
          <div className="plan-summary-price">{fmt(price)}/mês</div>
        </div>

        {step === 1 && (
          <>
            <div className="form-group">
              <label className="form-label">Titular da conta</label>
              <input
                className="form-input"
                value={form.name}
                onChange={set("name")}
                placeholder="Nome completo"
              />
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
              <label className="form-label">Forma de pagamento</label>
            </div>

            <div className="payment-methods">
              {["card", "pix", "boleto"].map((m) => (
                <button
                  key={m}
                  className={`pay-method${method === m ? " selected" : ""}`}
                  onClick={() => setMethod(m)}
                >
                  {m === "card" ? "💳 Cartão" : m === "pix" ? "⚡ PIX" : "📄 Boleto"}
                </button>
              ))}
            </div>

            {method === "card" && (
              <>
                <div className="form-group">
                  <label className="form-label">Número do cartão</label>
                  <input
                    className="form-input"
                    placeholder="0000 0000 0000 0000"
                    value={form.number}
                    onChange={set("number")}
                    maxLength={19}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Validade</label>
                    <input
                      className="form-input"
                      placeholder="MM/AA"
                      value={form.expiry}
                      onChange={set("expiry")}
                      maxLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      className="form-input"
                      placeholder="000"
                      value={form.cvv}
                      onChange={set("cvv")}
                      maxLength={4}
                    />
                  </div>
                </div>
              </>
            )}

            {method === "pix" && (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "3rem" }}>📱</div>
                <p style={{ color: "var(--muted)", fontSize: "0.84rem", marginTop: "0.5rem" }}>
                  Ao confirmar, você receberá o QR Code PIX por e-mail.
                </p>
              </div>
            )}

            {method === "boleto" && (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "3rem" }}>📋</div>
                <p style={{ color: "var(--muted)", fontSize: "0.84rem", marginTop: "0.5rem" }}>
                  Boleto enviado para {user?.email}. Vencimento em 3 dias úteis.
                </p>
              </div>
            )}

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setStep(2)}
            >
              Continuar →
            </button>
          </>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3.2rem", marginBottom: "1rem" }}>🛡️</div>
            <div
              style={{
                fontFamily: "var(--font-d)",
                fontSize: "1.15rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
              }}
            >
              Confirmar assinatura?
            </div>
            <p style={{ color: "var(--muted)", fontSize: "0.84rem", marginBottom: "2rem" }}>
              Ativando o plano <strong>{plan.name}</strong> por <strong>{fmt(price)}/mês</strong>.
              <br />
              Cancele quando quiser, sem multa.
            </p>

            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", justifyContent: "center", marginBottom: "0.7rem" }}
              onClick={finish}
              disabled={loading}
            >
              {loading ? "Processando..." : "✅ Confirmar e Ativar"}
            </button>
            <button
              className="btn btn-ghost"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setStep(1)}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

