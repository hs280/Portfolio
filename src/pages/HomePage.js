import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function HomePage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/homepage.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading homepage content:', error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div style={{ width: '300px', padding: '20px', display: 'flex', alignItems: 'center' }}>
          {/* <img src="/home_image.png" alt="Home" style={{ width: '100%', height: 'auto', maxHeight: '400px' }} /> */}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <a href="https://github.com/hs280" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: '30px', marginRight: '10px' }} />
          Visit my GitHub
        </a>
      </div>
    </div>
  );
}

export default HomePage;
