import React, { useEffect, useState } from 'react';
import { Button } from '../../elements/Button';
import { postCourse } from '../../connection/course/postCourse';
import { CourseLoader } from '../../connection/loadCourses';
import { GetCourseForUpdate } from '../../connection/course/getCourseForUpdate';
import { updateCourse } from '../../connection/course/updateCourse';

export function CourseUpdate({ courses, setCourses}) {

  const [teachers, setTeachers] = useState([]);

  const [course, setCourse] = useState({ name: '', description: '', teacher_id: '', image: '' });


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

  useEffect(() => {
    if (courses.length > 0) {
      setCourse(courses[0]); 
    }
  }, [courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value, // Обновляем поле с новым значением
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
    try {

      const statusCode = await updateCourse(course.id, course.name, course.description, course.teacher_id, course.image); // Вызов функции

      if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.");
      } else {
        alert("Курс успешно обновлён.");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <>
      <GetCourseForUpdate setCourses={setCourses}/>
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
                  <label htmlFor="teacher_id" style={{ fontStyle: 'inherit' }}>Учитель</label>
                  <select
                    name="teacher_id"
                    id="teacher_id"
                    value={course.teacher_id || ''} // Убедитесь, что здесь правильное имя свойства
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
                    <p>Текущее изображение</p>
                    <img src={course.image} style={{ border: "2px solid #000000", width: '100px', height: '100px', borderRadius: '5px' }} />
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
                text="Сохранить изменения"
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