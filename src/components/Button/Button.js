import React from 'react';

const Button = ({ appliedClass, onClick, text }) => {
  return (
    <button 
      className={appliedClass}
      onClick={onClick}
    >
      {text}
  </button>
  )
};

export default Button;