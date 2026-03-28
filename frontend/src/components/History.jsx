function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60)          return 'just now';
  if (diff < 3600)        return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)       return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7)   return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function History({ history, onSelect, onRemove, onClear }) {
  if (!history.length) return null;

  return (
    <div className="history">
      <div className="history-header">
        <span>Recent Explanations</span>
        <button className="history-clear-btn" onClick={onClear} title="Clear history">
          Clear all
        </button>
      </div>
      <div className="history-list">
        {history.map((entry) => (
          <div key={entry.id} className="history-card" onClick={() => onSelect(entry.data)}>
            <div className="history-card-body">
              <span className="history-concept">{entry.concept}</span>
              <span className="history-title">{entry.title}</span>
            </div>
            <div className="history-card-meta">
              <span className="history-time">{timeAgo(entry.timestamp)}</span>
              <button
                className="history-remove-btn"
                onClick={(e) => { e.stopPropagation(); onRemove(entry.id); }}
                title="Remove"
              >✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
