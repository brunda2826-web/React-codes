import React, { useState } from 'react';
import './App.css';

// Program 5: BCSL657B - VTU React Lab
// Component composition with props.
// FigureList (parent) renders multiple BasicFigure (child) components.
// Passes image URLs and captions as props. Users can add/remove images dynamically.

// --- Child Component: BasicFigure ---
function BasicFigure({ url, caption, onRemove }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`figure-card ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={url} alt={caption} className="figure-img" />
      <p className="figure-caption">{caption}</p>
      <button className="remove-btn" onClick={onRemove}>✕ Remove</button>
    </div>
  );
}

// --- Parent Component: FigureList ---
function FigureList() {
  const [figures, setFigures] = useState([
    { id: 1, url: 'https://picsum.photos/seed/react1/300/200', caption: 'React Landscape' },
    { id: 2, url: 'https://picsum.photos/seed/vtu2/300/200', caption: 'VTU Campus' },
    { id: 3, url: 'https://picsum.photos/seed/code3/300/200', caption: 'Code Art' },
  ]);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const addFigure = () => {
    if (!newUrl.trim() || !newCaption.trim()) return;
    setFigures([...figures, { id: Date.now(), url: newUrl.trim(), caption: newCaption.trim() }]);
    setNewUrl('');
    setNewCaption('');
  };

  const removeFigure = (id) => {
    setFigures(figures.filter((f) => f.id !== id));
  };

  return (
    <div className="figure-list-container">
      <h2>VTU BCSL657B - Program 5: FigureList with BasicFigure Components</h2>

      <div className="add-form">
        <input
          type="text"
          placeholder="Image URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Caption"
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          className="form-input"
        />
        <button className="add-btn" onClick={addFigure}>Add Image</button>
      </div>

      <div className="grid">
        {figures.length === 0 && <p className="empty">No images. Add one above!</p>}
        {figures.map((fig) => (
          <BasicFigure
            key={fig.id}
            url={fig.url}
            caption={fig.caption}
            onRemove={() => removeFigure(fig.id)}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <FigureList />
    </div>
  );
}

export default App;
