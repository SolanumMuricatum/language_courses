import React from 'react';
import { Link } from 'react-router-dom';

const MyComponent = () => {
  return (
    <div>
      <h2>Мой компонент</h2>
      <Link to="/target-path">
        <button>Перейти</button>
      </Link>
    </div>
  );
};

export default MyComponent;