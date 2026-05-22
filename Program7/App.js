import React, { useState } from 'react';
import './App.css';

// Program 7: BCSL657B - VTU React Lab
// ProfileCard component using both external CSS and inline styling.
// - Profile picture (circle), name, bio
// - Dynamic background color from state
// - Hover effect/animation

const COLORS = ['#3498db', '#9b59b6', '#e67e22', '#2ecc71', '#e74c3c', '#1abc9c'];

function ProfileCard({ name, imgUrl, bio }) {
  const [bgColor, setBgColor] = useState(COLORS[0]);
  const [hovered, setHovered] = useState(false);

  // Inline styles for dynamic/specific elements
  const cardInlineStyle = {
    background: `linear-gradient(135deg, ${bgColor}22, #ffffff)`,
    borderTop: `5px solid ${bgColor}`,
    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
    boxShadow: hovered
      ? '0 16px 40px rgba(0,0,0,0.18)'
      : '0 6px 18px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const nameStyle = { color: bgColor };

  return (
    <div
      className="profile-card"
      style={cardInlineStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={imgUrl} alt={name} className="profile-pic" />
      <h2 className="profile-name" style={nameStyle}>{name}</h2>
      <p className="profile-bio">{bio}</p>

      <div className="color-selector">
        <p className="color-label">Change theme:</p>
        <div className="color-swatches">
          {COLORS.map((color) => (
            <span
              key={color}
              className={`swatch ${bgColor === color ? 'active' : ''}`}
              style={{ background: color }}
              onClick={() => setBgColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>VTU BCSL657B – Program 7: ProfileCard</h1>
      <div className="cards-wrapper">
        <ProfileCard
          name="Ravi Kumar"
          imgUrl="https://i.pravatar.cc/150?img=12"
          bio="Full-Stack Developer | VTU CSE Student | React Enthusiast 🚀"
        />
        <ProfileCard
          name="Priya Sharma"
          imgUrl="https://i.pravatar.cc/150?img=47"
          bio="UI/UX Designer | Machine Learning Explorer | Coffee Lover ☕"
        />
      </div>
    </div>
  );
}

export default App;
