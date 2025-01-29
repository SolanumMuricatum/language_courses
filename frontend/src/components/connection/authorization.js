export const authorization = async (login, password) => {
  console.log(login, password);
  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login, password: password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при авторизации:', error); // Логируем ошибку
    return { error: 'Произошла ошибка при соединении с сервером' };
  }
};