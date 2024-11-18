import React, { useEffect, useState } from 'react';
import { TaskLoader } from '../connection/loadTasks';
import { InputSubmit } from '../elements/InputSubmit';
import { postUserAnswer } from '../connection/postUserAnswer';

export function TaskPage({ tasks, setTasks }) {
  const userId = JSON.parse(localStorage.getItem('user_id'));

  const [answers, setAnswers] = useState({}); // Хранилище для ответов
  const [errors, setErrors] = useState({}); // Хранилище для ошибок

  useEffect(() => {
    // Инициализация состояния ответов при загрузке задач
    const initialAnswers = {};
    tasks.forEach(task => {
      if (task.userAnswer) {
        initialAnswers[task.id] = task.userAnswer; // Устанавливаем существующий ответ
      }
    });
    setAnswers(initialAnswers);
  }, [tasks]);

  const handleInputChange = (event, taskId) => {
    const { value } = event.target;

    // Обновляем ответ для конкретного задания
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [taskId]: value,
    }));

    // Очищаем ошибку для конкретного задания
    setErrors(prevErrors => ({
      ...prevErrors,
      [taskId]: '',
    }));
  };

  const handleSubmit = async (event, taskId) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const answer = answers[taskId] || ''; // Получаем ответ для конкретного задания

    try {
      const statusCode = await postUserAnswer(answer, taskId, userId); // Вызов функции
      
      if (statusCode && statusCode != 201) {
        // Проверяем, существует ли responseData и его statusCode
        setErrors(prevErrors => ({
          ...prevErrors,
          [taskId]: 'Произошла ошибка при отправке данных на сервер:(', // Устанавливаем сообщение об ошибке для конкретного задания
          // [taskId]: responseData.data ? responseData.data.error : 'Произошла ошибка при отправке данных на сервер:(',
        }));
      } 
      else{
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        [taskId]: 'Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.',
      }));
    }
  };

  function changeBorder(result) {
    if (result === 0) {
      return "#FF0000"; // Красный цвет для неправильного ответа
    } else if (result === 1) {
      return "#008000"; // Зеленый цвет для правильного ответа
    } else {
      return "#000000"; // Черный по умолчанию
    }
  }

  function setTextToLabel(userAnswer, rightAnswer) {
    return userAnswer 
      ? `Правильный ответ: ${rightAnswer}` 
      : 'Введите ваш ответ с большой буквы';
  }

  return (
    <>
      <TaskLoader setTasks={setTasks} />
      <div style={{ paddingBottom: '50px' }}>
        <h1>Задания урока</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            maxWidth: '1200px',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id} // Используем уникальный ID задания
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ padding: '10px', flex: '1' }}>
                <h2>{task.name}</h2>
                <h3>{task.description}</h3>
                <form id={`task-form-${task.id}`} onSubmit={(event) => handleSubmit(event, task.id)}>
                  <label style={{ display: 'block' }} htmlFor={`answer-${task.id}`}>
                    {setTextToLabel(task.userAnswer, task.rightAnswer)}
                  </label>
                  {errors[task.id] && <div style={{ color: 'red' }}>{errors[task.id]}</div>} {/* Ошибка для конкретного задания */}
                  <input
                    style={{
                      display: 'block',
                      margin: '0 auto',
                      marginTop: '10px',
                      height: '30px',
                      width: '500px',
                      fontSize: '16px',
                      border: `3px solid ${changeBorder(task.result)}`,
                    }} 
                    type="text" 
                    name="answer" 
                    id={`userAnswer-${task.id}`}
                    value={answers[task.id] || ''} // Получаем ответ для конкретного задания
                    onChange={(event) => handleInputChange(event, task.id)} // Обновляем состояние при изменении
                    disabled={!!task.userAnswer} // Делаем поле неактивным, если ответ уже есть
                  />
                  <InputSubmit userAnswer={task.userAnswer} />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}