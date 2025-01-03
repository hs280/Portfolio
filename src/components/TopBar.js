import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TopBar({ darkMode, toggleDarkMode }) {
  const [homeHover, setHomeHover] = useState(false);
  const [aboutHover, setAboutHover] = useState(false);
  const [projectsHover, setProjectsHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);

  const linkStyle = {
    marginRight: '20px',
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const hoverColor = '#FFD700'; // Bright gold color

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: darkMode ? '#444' : '#f0f0f0',
      color: darkMode ? '#fff' : '#333',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/dinosaur-game">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            style={{ height: '40px', marginRight: '20px', filter: darkMode ? 'invert(1)' : 'none' }} 
          />
        </Link>
        <nav>
          <Link 
            to="/" 
            style={{...linkStyle, color: homeHover ? hoverColor : 'inherit'}}
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={{...linkStyle, color: aboutHover ? hoverColor : 'inherit'}}
            onMouseEnter={() => setAboutHover(true)}
            onMouseLeave={() => setAboutHover(false)}
          >
            About
          </Link>
          <Link 
            to="/projects" 
            style={{...linkStyle, marginRight: 0, color: projectsHover ? hoverColor : 'inherit'}}
            onMouseEnter={() => setProjectsHover(true)}
            onMouseLeave={() => setProjectsHover(false)}
          >
            Projects
          </Link>
        </nav>
      </div>
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          background: 'none', 
          border: 'none', 
          fontSize: '24px', 
          cursor: 'pointer',
          transition: 'color 0.3s ease',
          color: toggleHover ? hoverColor : 'inherit',
        }}
        onMouseEnter={() => setToggleHover(true)}
        onMouseLeave={() => setToggleHover(false)}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  );
}

export default TopBar;
