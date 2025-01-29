export const postModule = async (courseId, name, description) => {
  try {
    const response = await fetch(`http://localhost:8080/module/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: courseId, name: name, description: description}),
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