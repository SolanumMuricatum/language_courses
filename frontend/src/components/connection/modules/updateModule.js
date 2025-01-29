export const updateModule = async (module_courseId, module_id, name, description) => {
  try {
    const response = await fetch(`http://localhost:8080/module/update/${module_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, description: description, courseId: module_courseId}),
    });

    const statusCode = response.status;
    console.log('Код ответа:', statusCode);


    return statusCode;
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error); // Логируем ошибку
    return { error: 'Произошла ошибка при соединении с сервером' };
  }
};