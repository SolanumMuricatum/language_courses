export const updateUser = async (user_id, name, surname, email, password, role) => {
  try {
    const response = await fetch(`http://localhost:8080/users/update/${user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, surname: surname, email: email, password: password, role: role}),
    });

    const statusCode = response.status;
    console.log('Код ответа:', statusCode);


    return statusCode;
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error); // Логируем ошибку
    return { error: 'Произошла ошибка при соединении с сервером' };
  }
};