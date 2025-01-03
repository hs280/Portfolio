function Footer({darkMode}) {
    return (
      <footer style={{ 
        backgroundColor: darkMode ? '#444' : '#f0f0f0',
        padding: '10px', 
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        {/* Footer content goes here */}
      </footer>
    );
  }
  

export default Footer;