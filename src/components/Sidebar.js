import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ projects, isOpen, darkMode, toggleSidebar }) {
  const [hoveredElement, setHoveredElement] = useState(null);

  const hoverColor = '#FFD700'; // Bright gold color

  return (
    <nav style={{
      height: 'calc(100vh - 50px)', // Adjust height to be below the top bar
      width: isOpen ? '200px' : '50px',
      transition: 'width 0.3s',
      overflow: 'hidden',
      backgroundColor: darkMode ? '#444' : '#f0f0f0',
      color: darkMode ? '#fff' : '#333',
      position: 'fixed',
      left: 0,
      top: '50px', // Start below the top bar
      zIndex: 1000,
    }}>
      <button 
        onClick={toggleSidebar} 
        onMouseEnter={() => setHoveredElement('toggle')}
        onMouseLeave={() => setHoveredElement(null)}
        style={{
          width: '100%',
          padding: '10px',
          background: 'none',
          border: 'none',
          color: hoveredElement === 'toggle' ? hoverColor : 'inherit',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
        }}
      >
        {isOpen ? '←' : '→'}
      </button>
      {isOpen && (
        <ul style={{ listStyle: 'none', padding: '20px' }}>
          {projects.map(project => (
            <li key={project.name} style={{ marginBottom: '10px' }}>
              <Link 
                to={project.path} 
                onMouseEnter={() => setHoveredElement(project.name)}
                onMouseLeave={() => setHoveredElement(null)}
                style={{ 
                  color: hoveredElement === project.name ? hoverColor : 'inherit', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Sidebar;
