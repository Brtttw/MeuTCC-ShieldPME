import { useEffect } from "react";

export default function Notification({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      <div className="notif-text">
        <strong>{type === "success" ? "Sucesso!" : "Erro"}</strong>
        <p>{msg}</p>
      </div>
    </div>
  );
}

