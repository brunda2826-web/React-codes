import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Program 9: BCSL657B - VTU React Lab
// React Router using react-router-dom.
// Navigation bar with links to Home, About, Contact.
// Separate page components, active link highlighted.
// Uses BrowserRouter and Route.

// --- Page Components ---
function Home() {
  return (
    <div className="page">
      <h1>🏠 Home</h1>
      <p>Welcome to the VTU React Lab - BCSL657B Program 9!</p>
      <p>
        This application demonstrates <strong>client-side routing</strong> using the{' '}
        <code>react-router-dom</code> library. Click on the navigation links above to
        switch between pages without a full page reload.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>ℹ️ About</h1>
      <p>This project is part of the <strong>VTU 6th Semester 2022 Scheme</strong> React Lab (BCSL657B).</p>
      <ul>
        <li>Subject Code: BCSL657B</li>
        <li>Credits: 01</li>
        <li>SEE Marks: 50 | CIE Marks: 50</li>
        <li>Exam Type: Practical</li>
      </ul>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1>📬 Contact</h1>
      <p>Reach out to your VTU lab instructor for queries regarding BCSL657B.</p>
      <div className="contact-info">
        <p><strong>Email:</strong> lab@vtu.ac.in</p>
        <p><strong>Location:</strong> VTU Campus, Belgaum, Karnataka</p>
        <p><strong>Phone:</strong> +91-000-0000000</p>
      </div>
    </div>
  );
}

// --- Main App with Router ---
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <span className="brand">BCSL657B</span>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
