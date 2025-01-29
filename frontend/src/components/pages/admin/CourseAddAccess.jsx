import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { postUserSubscription } from '../../connection/user/postUserSubscription';
import { UsersWithoutSubscriptionLoader } from '../../connection/loadUsersWithoutSubscription';

export function CourseAddAccess({ users, setUsers }) {
  const [user, setUser] = useState({ id: '' });
  const { course_id } = useParams();

  // Обработчик изменения выбора пользователя
  const handleChange = (e) => {
    const { value } = e.target; // Извлекаем только значение
    setUser({ id: value }); // Обновляем состояние только с id
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const statusCode = await postUserSubscription(user.id, course_id);

      if (statusCode && statusCode !== 201) {
        alert("Произошла ошибка при отправке данных на сервер.");
      } else {
        alert("Теперь пользователь подписан на этот курс.");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <>
      <UsersWithoutSubscriptionLoader setUsers={setUsers} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '1200px',
          justifyContent: 'center',
          margin: '0 auto',
          paddingTop: '200px'
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '500px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '10px',
            paddingBottom: '20px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="userId" style={{ fontStyle: 'inherit' }}>Пользователь</label>
                    <select
                      name="userId" // Здесь name остается
                      id="userId"
                      value={user.id} // Используем id из состояния
                      onChange={handleChange} // Обработчик изменения
                      required
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                    >
                      <option value="" disabled>Выберите сотрудника</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name + " " + user.surname}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '10px', textAlign: 'center', marginTop: '20px' }}>
              <Button
                type="submit"
                text="Подписать на курс"
                backgroundColor="#4CAF50"
                hoverColor="#45a049"
                style={{ width: '100%' }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}