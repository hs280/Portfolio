import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DinosaurGamePage from './pages/DinosaurGamePage'; // Import the new game page
import Footer from './components/Footer';

function App() {
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: darkMode ? '#222' : '#fff',
        color: darkMode ? '#fff' : '#333',
      }}>
        <TopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div style={{ 
          flex: 1, 
          paddingTop: '0px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px', // Adjust this value as needed
            padding: '35px 20px', // Add padding on both sides
          }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage projects={projects} darkMode={darkMode} />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage projects={projects} darkMode={darkMode} />} />
              <Route path="/dinosaur-game" element={<DinosaurGamePage darkMode={darkMode} />} /> {/* New route for the game */}
            </Routes>
          </div>
        </div>
        <Footer darkMode={darkMode}/>
      </div>
    </Router>
  );
}

export default App;
