import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('sd');
  const [scrolled, setScrolled] = useState(false);

  // Navbar collapse on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const response = await axios.post('http://localhost:8000/generate', {
        prompt,
        mode,
        num_steps: 20,
        guidance: 7.5
      });
      setImage(response.data.image);
    } catch (err) {
      setError('Backend not connected. Start Colab first.');
    }
    setLoading(false);
  };

  return (
    <div className="app">

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
  <div className="nav-logo">VisionForge</div>
  {!scrolled && (
   <div className="nav-links">
  <a onClick={(e) => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); }}>About</a>
  <a onClick={(e) => { e.preventDefault(); document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
  <a onClick={(e) => { e.preventDefault(); document.getElementById('generate').scrollIntoView({ behavior: 'smooth' }); }}>Generate</a>
</div>
  )}
</nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-tag">✦ Generative AI · Text to Image</div>
          <h1 className="hero-title">
            Turn words into<br />
            <span className="highlight">stunning visuals</span>
          </h1>
          <p className="hero-sub">
            Powered by Stable Diffusion + LoRA and a custom CGAN with attention layers.
            Type anything. Watch it come alive.
          </p>
          <div className="hero-badges">
            <span>✓ Stable Diffusion 1.5</span>
            <span>✓ LoRA Fine-tuned</span>
            <span>✓ CGAN + Attention</span>
            <span>✓ CLIP Text Encoder</span>
          </div>
        <a onClick={(e) => { e.preventDefault(); document.getElementById('generate').scrollIntoView({ behavior: 'smooth' }); }} className="hero-cta">Start Generating →</a>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="section-tag">ABOUT VISIONFORGE</div>
        <h2 className="section-title">
          Two powerful models,<br />
          <span className="highlight-italic">one seamless experience</span>
        </h2>
        <p className="section-sub">
          VisionForge combines two state-of-the-art AI pipelines into a single web application.
          Switch between photorealistic generation and research-grade GAN outputs — all from your browser.
        </p>

        {/* Mac Terminal Window */}
        <div className="terminal">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">visionforge — pipeline info</span>
          </div>
          <div className="terminal-body">
            <p><span className="t-green">$</span> visionforge --mode stable-diffusion</p>
            <p className="t-gray">  Model      : runwayml/stable-diffusion-v1-5</p>
            <p className="t-gray">  LoRA       : pcuenq/pokemon-lora</p>
            <p className="t-gray">  Encoder    : openai/clip-vit-base-patch32</p>
            <p className="t-gray">  Steps      : 20 inference steps</p>
            <p className="t-gray">  Output     : 512x512 PNG</p>
            <p className="t-gray">  Device     : CUDA (T4 GPU)</p>
            <br />
            <p><span className="t-orange">$</span> visionforge --mode cgan</p>
            <p className="t-gray">  Model      : Custom CGAN (PyTorch)</p>
            <p className="t-gray">  Attention  : Self-attention + Cross-attention</p>
            <p className="t-gray">  Condition  : CLIP text embeddings (512-dim)</p>
            <p className="t-gray">  Generator  : 4x4 → 8x8 → 16x16 → 32x32 → 64x64</p>
            <p className="t-gray">  Dataset    : Oxford-102 Flowers (102 classes)</p>
            <p className="t-gray">  Output     : 64x64 PNG</p>
            <br />
            <p><span className="t-blue">✓</span> <span className="t-white">Both pipelines ready. Server running on port 8000.</span></p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        <div className="section-tag">WHAT WE BUILT</div>
        <h2 className="section-title">
          Every component,<br />
          <span className="highlight-italic">purpose built</span>
        </h2>

        <div className="cards-grid">
          <div className="glass-card">
            <div className="card-icon">🎨</div>
            <h3>Stable Diffusion + LoRA</h3>
            <p>Pre-trained SD 1.5 fine-tuned with domain-specific LoRA weights. Generates photorealistic, high quality images in 5 seconds on GPU.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon">🧠</div>
            <h3>CGAN + Self Attention</h3>
            <p>Custom Conditional GAN built from scratch in PyTorch. Generator and Discriminator enhanced with self-attention layers for better spatial understanding.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon">📝</div>
            <h3>CLIP Text Encoder</h3>
            <p>OpenAI CLIP encodes your text prompt into a 512-dimensional vector. Both models use this shared encoder for consistent text understanding.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon">🌸</div>
            <h3>Oxford-102 Dataset</h3>
            <p>102 flower classes analyzed and visualized. Class distribution, image resolution stats, and sample grids explored for domain understanding.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon">⚡</div>
            <h3>FastAPI Backend</h3>
            <p>High performance Python REST API serving both models. Models loaded once on startup for instant inference. CORS enabled for seamless frontend integration.</p>
          </div>

          <div className="glass-card">
            <div className="card-icon">🖥️</div>
            <h3>React Frontend</h3>
            <p>Modern single-page application with real-time image generation, mode switching, and responsive design. Built with React 18 and Axios.</p>
          </div>
        </div>
      </section>

      {/* ── GENERATOR ── */}
      <section className="generator" id="generate">
        <div className="section-tag">TRY IT NOW</div>
        <h2 className="section-title">
          Describe your vision,<br />
          <span className="highlight-italic">we'll paint it</span>
        </h2>

        {/* Mode Toggle */}
        <div className="mode-toggle">
          <button
            className={mode === 'sd' ? 'active' : ''}
            onClick={() => setMode('sd')}
          >
            🎨 Stable Diffusion + LoRA
          </button>
          <button
            className={mode === 'cgan' ? 'active' : ''}
            onClick={() => setMode('cgan')}
          >
            🧠 CGAN + Attention
          </button>
        </div>

        {/* Input */}
        <div className="input-section">
          <input
            type="text"
            placeholder="a field of red roses under a starry night sky..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateImage()}
          />
          <button className="generate-btn" onClick={generateImage} disabled={loading}>
            {loading ? 'Generating...' : 'Generate →'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <p>Creating your image using {mode === 'sd' ? 'Stable Diffusion + LoRA' : 'CGAN + Attention'}...</p>
          </div>
        )}

        {image && (
          <div className="image-result">
            <img src={`data:image/png;base64,${image}`} alt="Generated" />
            <p className="caption">"{prompt}"</p>
            <p className="model-tag">Generated with {mode === 'sd' ? 'Stable Diffusion + LoRA' : 'CGAN + Attention'}</p>
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
  <p>© 2026 VisionForge. All rights reserved.</p>
  <p>Turn your words into stunning visuals</p>
</footer>

    </div>
  );
}

export default App;