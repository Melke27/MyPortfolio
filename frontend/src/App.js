import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              Melkamu Wako
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-links">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/portfolio" className="nav-links">Portfolio</Link>
              </li>
              <li className="nav-item">
                <Link to="/calculator" className="nav-links">Calculator</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <iframe 
              src="/melkamu wako landing page.html" 
              style={{ width: '100%', height: 'calc(100vh - 80px)', border: 'none' }}
              title="Landing Page"
            />
          } />
          <Route path="/portfolio" element={
            <iframe 
              src="/MyPORTOFILO.html" 
              style={{ width: '100%', height: 'calc(100vh - 80px)', border: 'none' }}
              title="Portfolio"
            />
          } />
          <Route path="/calculator" element={
            <iframe 
              src="/calculator2.html" 
              style={{ width: '100%', height: 'calc(100vh - 80px)', border: 'none' }}
              title="Calculator"
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 