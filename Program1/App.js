import React, { useState } from 'react';
import './App.css';

// Program 1: BCSL657B - VTU React Lab
// Use create-react-app to set up a new project. Edit the App.js file to include
// a stateful component with useState. Add an input field and a <h1> element that
// displays text based on the input. Dynamically update the <h1> content as the user types.

function App() {
  const [text, setText] = useState('Hello, World!');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <h2>VTU BCSL657B - Program 1: Dynamic Text Display</h2>
      <div className="container">
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={handleChange}
          className="input-field"
        />
        <h1 className="display-text">{text || 'Start typing above...'}</h1>
      </div>
    </div>
  );
}

export default App;
