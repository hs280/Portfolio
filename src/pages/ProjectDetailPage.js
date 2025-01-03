import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Sidebar from '../components/Sidebar';

function ProjectDetailPage({ projects, darkMode }) {
  const { projectId } = useParams();
  const project = projects.find(p => p.path === process.env.PUBLIC_URL + `/projects/${projectId}`);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (project) {
      fetch(process.env.PUBLIC_URL + `/projects/${projectId}.md`)
        .then(response => response.text())
        .then(text => setContent(text))
        .catch(error => console.error('Error loading project content:', error));
    }
  }, [projectId, project]);

  if (!project) return <div>Project not found</div>;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: 'flex', marginTop: '0px' }}>
      <Sidebar 
        projects={projects} 
        isOpen={sidebarOpen} 
        darkMode={darkMode} 
        toggleSidebar={toggleSidebar}
      />
      <div style={{ 
        marginLeft: sidebarOpen ? '200px' : '50px', 
        transition: 'margin-left 0.3s', 
        padding: '20px', 
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h1 style={{ textAlign: 'center' }}>{project.name}</h1>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            overflow: 'hidden',
            margin: '20px 0'
          }}>
            <img 
              src={project.image} 
              alt={project.name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                filter: darkMode ? 'invert(1)' : 'invert(0)', // Invert colors for dark mode
              }} 
            />
          </div>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
