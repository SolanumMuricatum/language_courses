export const deleteUser = async (user_id) => {
  try {
    const response = await fetch(`http://localhost:8080/users/delete/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Получаем код ответа
    const statusCode = response.status;
    console.log('Код ответа:', statusCode);

    //const data = await response.json();

    // Возвращаем данные вместе с кодом ответа
    return statusCode;
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error); // Логируем ошибку
    return { error: 'Произошла ошибка при соединении с сервером' };
  }
};