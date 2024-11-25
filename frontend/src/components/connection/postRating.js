export const postRating = async (courseId, rating, user_id) => {

  try {
    const response = await fetch(`http://localhost:8080/rating/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({courseId: courseId, user_id: user_id, rating: rating}),
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