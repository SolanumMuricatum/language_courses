export const postUser = async (name, surname, email, password, role) => {
  try {
    const response = await fetch(`http://localhost:8080/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, surname: surname, email: email, password: password, role: role}),
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