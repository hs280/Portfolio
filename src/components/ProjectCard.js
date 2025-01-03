import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverColor = '#FFD700'; // Bright gold color

  return (
    <Link 
      to={project.path} 
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
        borderRadius: '8px',
        padding: '15px',
        margin: '10px',
        width: '200px',
        textAlign: 'center',
        backgroundColor: darkMode ? '#444' : '#fff',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? `0 0 10px ${hoverColor}` : 'none',
      }}>
        <img 
          src={project.image} 
          alt={project.name} 
          style={{ 
            width: '100%', 
            height: '150px', 
            objectFit: 'contain', 
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            filter: `
              ${isHovered ? 'brightness(1.2)' : 'brightness(1)'} 
              ${darkMode ? 'invert(1)' : 'invert(0)'}
            `,
          }} 
        />
        <h3 style={{
          color: isHovered ? hoverColor : 'inherit',
          transition: 'color 0.3s ease',
        }}>
          {project.name}
        </h3>
      </div>
    </Link>
  );
}

export default ProjectCard;
