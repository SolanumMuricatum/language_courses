import React, { useState } from 'react';

export function InputDelete(){
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: hovered ? '#e63946' : '#d62839',
    marginTop: '10px',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <input
      type="submit"
      value="    Оценить   "
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};
