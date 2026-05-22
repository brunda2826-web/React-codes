import React from 'react';
import './App.css';

// Program 2: BCSL657B - VTU React Lab
// Demonstrate the use of props to pass data from a parent (App) to child
// components: Header (displays title/heading) and Footer (displays copyright/tagline).

// --- Child Component: Header ---
function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}

// --- Child Component: Footer ---
function Footer({ copyright, tagline }) {
  return (
    <footer className="footer">
      <p>{tagline}</p>
      <p className="copyright">{copyright}</p>
    </footer>
  );
}

// --- Parent Component: App ---
function App() {
  const appData = {
    title: 'My React Application',
    subtitle: 'VTU BCSL657B - Program 2: Props Demo',
    tagline: 'Building the web, one component at a time.',
    copyright: '© 2025 VTU React Lab | All Rights Reserved',
  };

  return (
    <div className="App">
      <Header title={appData.title} subtitle={appData.subtitle} />
      <main className="main-content">
        <h2>Welcome to the Props Demo</h2>
        <p>
          Data (title, subtitle, tagline, copyright) is passed from the{' '}
          <strong>App</strong> parent component to the <strong>Header</strong> and{' '}
          <strong>Footer</strong> child components using <strong>props</strong>.
        </p>
      </main>
      <Footer copyright={appData.copyright} tagline={appData.tagline} />
    </div>
  );
}

export default App;
