import { useState } from 'react';
import ConceptInput from './components/ConceptInput';
import ScenePlayer from './components/ScenePlayer';
import History from './components/History';
import { useHistory } from './hooks/useHistory';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [data, setData]       = useState(null);

  const { history, addEntry, removeEntry, clearHistory } = useHistory();

  const loadData = (d) => setData(d);

  const handleGenerate = async (concept) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept }),
      });
      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}));
        throw new Error(msg || `Server error ${res.status}`);
      }
      const result = await res.json();
      addEntry(concept, result);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>ConceptFlow</h1>
        <p>Type any concept. Watch it explained on a whiteboard — with voice.</p>
      </header>

      <ConceptInput onGenerate={handleGenerate} disabled={loading} />

      <History
        history={history}
        onSelect={loadData}
        onRemove={removeEntry}
        onClear={clearHistory}
      />

      {error && <div className="error-msg">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Generating your explainer video…</p>
        </div>
      )}

      {data && <ScenePlayer key={data.title} data={data} />}
    </div>
  );
}
