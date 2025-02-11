import React, { useState, useEffect } from 'react';
import './Bubble.css';

const Bubble = () => {
  const [emoji, setEmoji] = useState('😟');

  useEffect(() => {
    const interval = setInterval(() => {
      setEmoji((prev) => (prev === '😟' ? '😭' : '😟'));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <div className="bubble">{emoji}</div>;
};

export default Bubble;
