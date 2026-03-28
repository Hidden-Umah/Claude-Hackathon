import express from 'express';
import { generateScenes } from '../services/claude.js';

const router = express.Router();

router.post('/explain', async (req, res) => {
  const { concept } = req.body;
  if (!concept?.trim()) return res.status(400).json({ error: 'concept is required' });

  try {
    const data = await generateScenes(concept.trim());
    res.json(data);
  } catch (err) {
    console.error('[explain]', err.message);
    res.status(500).json({ error: 'Failed to generate explanation. Check your ANTHROPIC_API_KEY.' });
  }
});

export default router;
