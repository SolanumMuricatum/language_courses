export const postBackup = async () => {

  try {
    const response = await fetch(`http://localhost:8080/backup/database`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const statusCode = response.status;
    console.log('Код ответа:', statusCode);

    return statusCode;
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error); // Логируем ошибку
    return { error: 'Произошла ошибка при соединении с сервером' };
  }
};