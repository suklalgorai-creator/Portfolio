
export function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <span style={{ color: 'var(--ink-green)' }}>●</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
