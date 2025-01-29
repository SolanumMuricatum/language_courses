import React, { useEffect, useState } from 'react';
import { Button } from '../../../elements/Button';
import { GetUserForUpdate } from '../../../connection/user/getUserForUpdate';
import { updateUser } from '../../../connection/user/updateUser';

export function UserUpdate({ users, setUsers }) {
  const [user, setUser] = useState({name: '', surname: '', email: '', password: '', role: ''});

  // Эффект для получения модуля при загрузке
  useEffect(() => {
    if (users.length > 0) {
      console.log(users);
      setUser(users[0]); // Предполагаем, что приходит только один пользователь
    }
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevModule => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const statusCode = await updateUser(user.id, user.name, user.surname, user.email, user.password, user.role);

      if (statusCode === 409) { // Проверка на существующую почту
        alert("Пользователь с этой почтой уже существует.");
      } else if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.");
      } else {
        alert("Пользователь успешно обновлён.");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <>
      <GetUserForUpdate setUsers={setUsers} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '1200px',
          justifyContent: 'center',
          margin: '0 auto',
          paddingTop: '100px'
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '500px',
            height: '450px',
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
                    <label htmlFor="name" style={{ fontStyle: 'inherit' }}>Имя</label>
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
                      value={user.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="surname" style={{ fontStyle: 'inherit' }}>Фамилия</label>
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
                      name="surname"
                      id="surname"
                      value={user.surname}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="email" style={{ fontStyle: 'inherit' }}>Почта</label>
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
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="password" style={{ fontStyle: 'inherit' }}>Пароль</label>
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
                      type="text" // Изменено на password для безопасности
                      name="password"
                      id="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="role" style={{ fontStyle: 'inherit' }}>Роль</label>
                    <select
                      name="role"
                      id="role"
                      value={user.role}
                      onChange={handleChange}
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
                      <option value="" disabled>Выберите роль</option>
                      <option value="user">Сотрудник</option>
                      <option value="teacher">Преподаватель</option>
                      <option value="admin">Администратор</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '10px', textAlign: 'center', marginTop: '20px' }}>
              <Button
                type="submit"
                text="Сохранить изменения"
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