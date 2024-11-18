import React from 'react';
import { ModuleLoader } from '../connection/loadModules';
import { Link } from 'react-router-dom';
import { Button } from '../elements/Button';

export function ModulePage({ modules, setModules }) {
  const userId = JSON.parse(localStorage.getItem('user_id'));
  console.log(userId);
  return (
    <>
      <ModuleLoader setModules={setModules} />
      <div style={{ paddingBottom: '50px' }}>
      <h1>Модули курса</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            maxWidth: '1200px',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {modules.map((module, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '300px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ padding: '10px', flex: '1' }}>
                <h2>{module.name}</h2>
                <p style={{ flexGrow: 1 }}>{module.description}</p>
              </div>
              <div style={{ padding: '10px', marginBottom: '20px' }}>
                <Link to={`/lessons/${module.id}/${userId}`}>
                  <Button text='Перейти к урокам' backgroundColor="#4CAF50" hoverColor="#45a049" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}