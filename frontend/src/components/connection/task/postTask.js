export const postTask = async (lessonId, name, description, rightAnswer) => {
  try {
    const response = await fetch(`http://localhost:8080/task/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lessonId: lessonId, name: name, description: description, rightAnswer: rightAnswer}),
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