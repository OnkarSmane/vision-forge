import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // These are our state variables
  // useState means: remember this value even when the page updates
  const [prompt, setPrompt] = useState('');        // what user typed
  const [image, setImage] = useState(null);        // generated image
  const [loading, setLoading] = useState(false);   // is it generating?
  const [error, setError] = useState(null);        // any errors?

  const generateImage = async () => {
    // Don't do anything if prompt is empty
    if (!prompt.trim()) return;

    setLoading(true);   // show loading state
    setError(null);     // clear any old errors
    setImage(null);     // clear old image

    try {
      // Send prompt to our FastAPI backend
      const response = await axios.post('https://headway-retinal-junior.ngrok-free.dev/generate', {
        prompt: prompt,
        mode: 'sd',
        num_steps: 20,
        guidance: 7.5
      });

      // Get the base64 image from response and display it
      setImage(response.data.image);

    } catch (err) {
      setError('Something went wrong. Is the backend running?');
    }

    setLoading(false);  // hide loading state
  };

  return (
    <div className="app">
      <h1>VisionForge</h1>
      <p className="subtitle">Generate images from text using AI</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Describe the image you want..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && generateImage()}
        />
        <button onClick={generateImage} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading && <p className="loading">Creating your image, please wait...</p>}

      {image && (
        <div className="image-section">
          <img src={`data:image/png;base64,${image}`} alt="Generated" />
          <p className="caption">"{prompt}"</p>
        </div>
      )}
    </div>
  );
}

export default App;