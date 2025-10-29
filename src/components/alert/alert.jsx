import { useState, useEffect } from "react";
import "./alert.scss";

export default function Alert({ title, message }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger slide-in after first paint for smooth animation
    const id = requestAnimationFrame(() => setMounted(true));
    setTimeout(() => {
      setMounted(false);
    }, 3000);
    return () => cancelAnimationFrame(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`alert-root ${mounted ? "in" : ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className="alert-content">
        {title ? <h4 className="alert-title">{title}</h4> : null}
        {message ? <p className="alert-message">{message}</p> : null}
      </div>
      <button
        type="button"
        className="alert-close"
        aria-label="Zamknij powiadomienie"
        onClick={() => {
          setMounted(false);
          setVisible(false);
        }}
      >
        ×
      </button>
    </div>
  );
}
