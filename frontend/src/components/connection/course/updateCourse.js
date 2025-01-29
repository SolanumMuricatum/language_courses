export const updateCourse = async (course_id, name, description, teacherId, image) => {
  try {
    const response = await fetch(`http://localhost:8080/course/update/${course_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, description: description, teacherId: teacherId, image: image}),
    });

    const statusCode = response.status;
    console.log('Код ответа:', statusCode);


    return statusCode;
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error); // Логируем ошибку
    return { error: 'Произошла ошибка при соединении с сервером' };
  }
};