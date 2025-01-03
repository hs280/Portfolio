import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';

function ProjectsPage({ projects, darkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: 'flex', marginTop: '50px' }}> {/* Add marginTop to push content below the top bar */}
      <Sidebar 
        projects={projects} 
        isOpen={sidebarOpen} 
        darkMode={darkMode} 
        toggleSidebar={toggleSidebar}
      />
      <div style={{ 
        marginLeft: sidebarOpen ? '200px' : '50px', 
        transition: 'margin-left 0.3s',
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        width: '100%',
      }}>
        {projects.map(project => (
          <ProjectCard key={project.name} project={project} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
