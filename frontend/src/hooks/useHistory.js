import { useState, useCallback } from 'react';

const STORAGE_KEY = 'conceptflow_history';
const MAX_ENTRIES = 20;

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useHistory() {
  const [history, setHistory] = useState(load);

  const addEntry = useCallback((concept, data) => {
    setHistory((prev) => {
      // Avoid duplicate — if same concept exists, move it to top with fresh data
      const filtered = prev.filter((e) => e.concept.toLowerCase() !== concept.toLowerCase());
      const entry = {
        id: Date.now(),
        concept,
        title: data.title,
        summary: data.summary,
        timestamp: new Date().toISOString(),
        data,
      };
      const next = [entry, ...filtered].slice(0, MAX_ENTRIES);
      save(next);
      return next;
    });
  }, []);

  const removeEntry = useCallback((id) => {
    setHistory((prev) => {
      const next = prev.filter((e) => e.id !== id);
      save(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
}
