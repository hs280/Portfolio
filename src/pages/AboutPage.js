import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function AboutPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/aboutMe.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading about me content:', error));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default AboutPage;
