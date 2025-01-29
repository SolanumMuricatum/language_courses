import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../elements/Button';
import { postModule } from '../../../connection/modules/postModule';

export function ModuleAdd() {
  const [module, setModule] = useState({ name: '', description: '' });
  const { course_id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModule(prevModule => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("jdndcjds" + course_id)
      const statusCode = await postModule(course_id, module.name, module.description); // Вызов функции

      if (statusCode && statusCode !== 201) {
        alert("Произошла ошибка при отправке данных на сервер.");
      } else {
        alert("Модуль успешно добавлен.");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '1200px',
          justifyContent: 'center',
          margin: '0 auto',
          paddingTop: '120px'
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '500px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '10px'
          }}
        >
          <form onSubmit={handleSubmit}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name" style={{ fontStyle: 'inherit' }}>Название</label>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="name"
                      id="name"
                      value={module.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="description" style={{ fontStyle: 'inherit' }}>Описание</label>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '50%',
                        marginTop: '10px',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="description"
                      id="description"
                      value={module.description}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '10px', marginTop: '150px' }}>
              <Button
                type="submit"
                text="Создать модуль"
                backgroundColor="#4CAF50"
                hoverColor="#45a049"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}