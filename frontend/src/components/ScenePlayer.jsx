import { useState, useEffect, useRef, useCallback } from 'react';
import WhiteboardCanvas from './WhiteboardCanvas';

function getBestVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.name === 'Google US English') ||
    voices.find((v) => v.name.includes('Google') && v.lang === 'en-US') ||
    voices.find((v) => v.lang === 'en-US' && !v.localService) ||
    voices.find((v) => v.lang.startsWith('en-')) ||
    null
  );
}

export default function ScenePlayer({ data }) {
  const { title, summary, scenes } = data;

  const [sceneIdx, setSceneIdx]       = useState(0);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  const totalScenes = scenes.length;
  const scene       = scenes[sceneIdx];

  // ── Wait for browser voices to load ──────────────────────────────────────
  useEffect(() => {
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoicesReady(true);
    } else {
      window.speechSynthesis.onvoiceschanged = () => setVoicesReady(true);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (voicesReady) setIsPlaying(true);
  }, [voicesReady]);

  // ── Core speak function ───────────────────────────────────────────────────
  const speakScene = useCallback((idx, onEnd) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(scenes[idx].narration);
    utter.rate  = 0.93;
    utter.pitch = 1.0;
    utter.voice = getBestVoice();
    utter.onend   = () => onEnd?.();
    utter.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utter);
  }, [scenes]);

  // ── Advance to next scene ─────────────────────────────────────────────────
  const handleSceneEnd = useCallback((idx) => {
    if (idx < totalScenes - 1) setSceneIdx(idx + 1);
    else setIsPlaying(false);
  }, [totalScenes]);

  useEffect(() => {
    if (!isPlaying) return;
    speakScene(sceneIdx, () => setTimeout(() => handleSceneEnd(sceneIdx), 400));
  }, [sceneIdx, isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Controls ──────────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const goTo = (idx) => {
    window.speechSynthesis.cancel();
    setSceneIdx(idx);
    setIsPlaying(false);
  };

  const progress = ((sceneIdx + 1) / totalScenes) * 100;
  const notReady = !voicesReady;

  return (
    <div className="player">
      {/* Header */}
      <div className="player-meta">
        <div className="player-meta-left">
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
        <div className="meta-badge">
          <span className="badge">{totalScenes} scenes</span>
          <span className="badge">{data.totalDuration || '~60'}s</span>
          <span className="badge green">Web Speech</span>
        </div>
      </div>

      {/* Whiteboard */}
      <div className="whiteboard-section">
        <div className="canvas-wrapper">
          <WhiteboardCanvas
            key={sceneIdx}
            scene={scene}
            isPlaying={isPlaying}
            onAnimationComplete={() => {}}
          />
          <div className="scene-badge">
            Scene {sceneIdx + 1}: {scene.title}
          </div>
          {notReady && (
            <div className="audio-loading-overlay">
              <div className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
              Loading voices…
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="controls-row">
            <div className="playback-btns">
              <button className="ctrl-btn" onClick={() => goTo(Math.max(0, sceneIdx - 1))} disabled={sceneIdx === 0} title="Previous">⏮</button>
              <button className="ctrl-btn play-btn" onClick={handlePlayPause} disabled={notReady} title={isPlaying ? 'Pause' : 'Play'}>
                {notReady ? '⏳' : isPlaying ? '⏸' : '▶'}
              </button>
              <button className="ctrl-btn" onClick={() => goTo(Math.min(totalScenes - 1, sceneIdx + 1))} disabled={sceneIdx === totalScenes - 1} title="Next">⏭</button>
            </div>
            <span className="scene-counter">Scene {sceneIdx + 1} / {totalScenes}</span>
          </div>
        </div>

        {/* Scene tabs */}
        <div className="scene-tabs" style={{ padding: '0 1.25rem 1rem' }}>
          {scenes.map((s, i) => (
            <button key={s.id} className={`scene-tab ${i === sceneIdx ? 'active' : ''}`} onClick={() => goTo(i)}>
              {i + 1}. {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Transcript */}
      <div className="transcript">
        <div className="transcript-header">Transcript</div>
        <div className="transcript-body">
          {scenes.map((s, i) => (
            <div
              key={s.id}
              className={`transcript-entry ${i === sceneIdx ? 'active' : ''}`}
              onClick={() => goTo(i)}
            >
              <span className="transcript-scene-label">Scene {i + 1} — {s.title}</span>
              <p>{s.narration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
