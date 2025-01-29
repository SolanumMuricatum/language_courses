import React, { useEffect, useState } from 'react';
import { Button } from '../../elements/Button';
import { postCourse } from '../../connection/course/postCourse';
import { CourseLoader } from '../../connection/loadCourses';

export function CourseAdd({ courses, setCourses, user_id }) {
  const [course, setCourse] = useState({
    teacherId: '',
    name: '',
    description: '',
    image: '',
    language: '',
    difficulty: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [customImage, setCustomImage] = useState(null); // Состояние для пользовательского изображения

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/getTeacher`);
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error('Ошибка при загрузке учителей:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Получаем файл
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Установка изображения в формате Base64 в состояние курса
        setCourse(prevCourse => ({
          ...prevCourse,
          image: reader.result // Сохраняем Base64 строку в поле image
        }));
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Формируем паттерн для поиска: язык_сложность
    const pattern = `${course.language}_${course.difficulty}`;
    console.log("Pattern:", pattern); // Проверка значения pattern

    
    if (!Array.isArray(courses)) {
        console.error("courses is not an array:", courses);
        alert("Ошибка: данные курсов недоступны.");
        return;
    }

    // Логируем массив курсов
    console.log("Courses:", courses);

    // Ищем существующий курс по паттерну
    const existingCourse = courses.find(c => c.id && c.id.includes(pattern));
    if (existingCourse) {
        alert("Курс с такой комбинацией языка и уровня сложности уже существует.");
        return;
    }

    if (!course.image) {
      alert("Пожалуйста, загрузите изображение для курса.");
      return;
    }

    try {
        const statusCode = await postCourse(course.name, course.description, course.teacherId, course.image, course.language, course.difficulty);

        if (statusCode && statusCode !== 201) {
            alert("Произошла ошибка при отправке данных на сервер.");
        } else {
            alert("Курс успешно добавлен.");
            window.location.reload();
        }
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
        alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <>
      <CourseLoader setCourses={setCourses} user_id={user_id} />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        maxWidth: '900px',
        justifyContent: 'center',
        margin: '0 auto',
        paddingTop: '20px'
      }}>
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '500px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: '10px'
        }}>
          <form onSubmit={handleSubmit}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="teacherId" style={{ fontStyle: 'inherit' }}>Учитель</label>
                    <select
                      name="teacherId"
                      id="teacherId"
                      value={course.teacherId}
                      onChange={handleChange}
                      required
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                    >
                      <option value="" disabled>Выберите учителя</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name + " " + teacher.surname}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" style={{ fontStyle: 'inherit' }}>Название</label>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="name"
                      id="name"
                      value={course.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="description" style={{ fontStyle: 'inherit' }}>Описание</label>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '50%',
                        marginTop: '10px',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="description"
                      id="description"
                      value={course.description}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="language" style={{ fontStyle: 'inherit' }}>Язык</label>
                    <p>по стандарту Alpha3. Пример: eng</p>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="language"
                      id="language"
                      value={course.language}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="difficulty" style={{ fontStyle: 'inherit' }}>Уровень сложности</label>
                    <select
                      name="difficulty"
                      id="difficulty"
                      value={course.difficulty}
                      onChange={handleChange}
                      required
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                    >
                      <option value="" disabled>Выберите уровень сложности</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="customImage" style={{ fontStyle: 'inherit' }}>Загрузите изображение</label>
                    <input
                      type="file"
                      id="customImage"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '10px', marginTop: '50px', marginBottom: '50px' }}>
              <Button
                type="submit"
                text="Создать курс"
                backgroundColor="#4CAF50"
                hoverColor="#45a049"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}