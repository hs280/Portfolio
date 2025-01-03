import React, { useState, useEffect, useCallback } from 'react';

function DinosaurGameComponent({ darkMode }) {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(() => parseInt(localStorage.getItem('maxScore'), 10) || 0);
  const [jumpHeight, setJumpHeight] = useState(0);
  const [jumpPower, setJumpPower] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const maxJumpHeight = 100;
  const jumpIncrement = 1;
  const fallIncrement = 4;
  const baseObstacleSpeed = 2;
  const gameWidth = 800; 
  const gameHeight = 200;

  // Update max score in localStorage
  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
      localStorage.setItem('maxScore', score);
    }
  }, [score, maxScore]);

  useEffect(() => {
    let scoreInterval;
    if (!gameOver) {
      scoreInterval = setInterval(() => {
        if (!isJumping) {
          setScore(prevScore => prevScore + 1);
        }
      }, 1000);
    }
    return () => clearInterval(scoreInterval);
  }, [isJumping, gameOver]);

  useEffect(() => {
    let obstacleInterval;
    if (!gameOver) {
      obstacleInterval = setInterval(() => {
        setObstacles(prev => {
          const filtered = prev.filter(obs => obs.position > -20);
          const probability = 0.01 + 0.001 * Math.sqrt(score);
          if (Math.random() < probability) {
            const lastObstacle = filtered[filtered.length - 1];
            let newPosition = gameWidth;
            
            if (lastObstacle) {
              const gap = newPosition - (lastObstacle.position + lastObstacle.width);
              if (gap >= 5 && gap <= 90) {
                newPosition = lastObstacle.position + lastObstacle.width + (Math.random() < 0.5 ? 4 : 91);
              }
            }
            
            return [
              ...filtered,
              { 
                position: newPosition, 
                width: 20,
                height: Math.random() * 30 + 20
              }
            ];
          }
          return filtered;
        });
      }, 16);
    }
    return () => clearInterval(obstacleInterval);
  }, [gameOver, score, gameWidth]);
  
  

  useEffect(() => {
    let powerUpInterval;
    if (!gameOver) {
      powerUpInterval = setInterval(() => {
        if (Math.random() < 0.01) {
          setPowerUps(prev => [
            ...prev,
            { 
              position: gameWidth, 
              size: 15, 
              yPos: Math.random() * 50 + 50 
            }
          ]);
        }
      }, 64);
    }
    return () => clearInterval(powerUpInterval);
  }, [gameOver]);

  useEffect(() => {
    let moveInterval;
    if (!gameOver) {
      moveInterval = setInterval(() => {
        const dynamicObstacleSpeed = baseObstacleSpeed + score * 0.1;
        setObstacles(prev => prev.map(obs => ({ ...obs, position: obs.position - dynamicObstacleSpeed })));
        setPowerUps(prev => prev.map(pu => ({ ...pu, position: pu.position - dynamicObstacleSpeed })));
      }, 16);
    }
    return () => clearInterval(moveInterval);
  }, [gameOver, score]);

  const handleJumpStart = useCallback((event) => {
    if (event.code === 'Space' && !isJumping && jumpHeight === 0 && !gameOver) {
      setIsJumping(true);
      setJumpPower(prevPower => Math.min(prevPower + 5, 15));
    }
  }, [isJumping, jumpHeight, gameOver]);

  const handleJumpEnd = useCallback((event) => {
    if (event.code === 'Space') {
      setIsJumping(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleJumpStart);
    window.addEventListener('keyup', handleJumpEnd);
    return () => {
      window.removeEventListener('keydown', handleJumpStart);
      window.removeEventListener('keyup', handleJumpEnd);
    };
  }, [handleJumpStart, handleJumpEnd]);

  useEffect(() => {
    let jumpInterval;
    if (isJumping) {
      jumpInterval = setInterval(() => {
        setJumpHeight(prevHeight => {
          if (prevHeight < maxJumpHeight) {
            return Math.min(prevHeight + jumpIncrement + jumpPower, maxJumpHeight);
          }
          setIsJumping(false);
          return prevHeight;
        });
      }, 16);
    } else if (jumpHeight > 0) {
      jumpInterval = setInterval(() => {
        setJumpHeight(prevHeight => Math.max(prevHeight - fallIncrement, 0));
        setJumpPower(0);
      }, 16);
    }
    return () => clearInterval(jumpInterval);
  }, [isJumping, jumpHeight, jumpPower]);

  useEffect(() => {
    const playerWidth = 50;
    const playerPosition = gameWidth * 0.2;

    obstacles.forEach(obstacle => {
      const playerRight = playerPosition + playerWidth - 10;
      const playerLeft = playerPosition + 10;
      const obstacleLeft = obstacle.position + 5;
      const obstacleRight = obstacle.position + obstacle.width - 5;
      const playerBottom = jumpHeight;

      if (playerRight > obstacleLeft && playerLeft < obstacleRight && playerBottom < obstacle.height - 5) {
        setGameOver(true);
      }
    });

    powerUps.forEach((powerUp, index) => {
      const playerRight = playerPosition + playerWidth+15;
      const playerLeft = playerPosition-15;
      const powerUpLeft = powerUp.position;
      const powerUpRight = powerUp.position + powerUp.size;
      const playerBottom = jumpHeight+15;

      if (playerRight > powerUpLeft && 
        playerLeft < powerUpRight && 
        playerBottom > powerUp.yPos - powerUp.size) { 
      setPowerUps(prev => prev.filter((_, i) => i !== index)); // Remove collected power-up
      setScore(prevScore => prevScore + 5); // Add fixed score for collecting a power-up
    }
  });
  }, [obstacles, powerUps, jumpHeight]);

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setPowerUps([]);
    setJumpHeight(0);
    setJumpPower(0);
    setIsJumping(false);
  };

  return (
    <div style={{
      position: 'relative',
      width: `${gameWidth}px`,
      height: `${gameHeight}px`,
      border: `2px solid ${darkMode ? '#fff' : '#000'}`,
      margin: '0 auto',
      overflow: 'hidden',
      backgroundColor: darkMode ? `hsl(${(score / 10) % 360}, 50%, 50%)` : '#fff'
    }}>
      <div 
        style={{
          position: 'absolute',
          bottom: `${jumpHeight}px`,
          left: '20%',
          transform: 'translateX(-50%)', 
          width: '50px', 
          height: '50px', 
          backgroundColor: darkMode ? `hsl(${(score / 10) % 360}, 50%, 50%)` : '#fff'
        }}
      >
        <img 
          src="/logo.svg" 
          alt="Logo" 
          style={{ 
            height: '60px', 
            filter: darkMode ? 'invert(1)' : 'none' // Invert color for dark mode
          }} 
        />
      </div>
      
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${obstacle.position}px`,
            width: `${obstacle.width}px`,
            height: `${obstacle.height}px`,
            backgroundColor: darkMode ? '#fff' : '#000',
          }}
        />
      ))}

      {powerUps.map((powerUp, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            bottom: `${powerUp.yPos}px`,
            left: `${powerUp.position}px`,
            width: `${powerUp.size}px`,
            height: `${powerUp.size}px`,
            backgroundColor: 'gold',
            borderRadius: '50%',
          }}
        />
      ))}
      
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '10px', 
        color: darkMode ? '#fff' : '#000'
      }}>
        Score: {score} | Max Score: {maxScore}
      </div>
      
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: darkMode ? '#fff' : '#000',
          backgroundColor: darkMode ? '#333' : '#fff',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h2>Game Over!</h2>
          <button 
            onClick={resetGame}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: darkMode ? '#fff' : '#000',
              color: darkMode ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div> 
  );
}

export default DinosaurGameComponent;
