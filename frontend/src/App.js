import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импорт Router
import {AppBarComponent} from './components/elements/Appbar';
import {CoursePage} from './components/pages/CoursePage';
import { MainPage } from './components/pages/MainPage';
import {ModulePage} from './components/pages/ModulePage';
import { useState } from 'react';
import { LoginPage } from './components/pages/LoginPage';
import { LessonPage } from './components/pages/LessonPage';
import { TaskPage } from './components/pages/TaskPage';
import { ScorePage } from './components/pages/ScorePage';
import { RatingPage } from './components/pages/RatingPage';

function App() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [score, setScore] = useState([]);
  const [tasks, setTasks] = useState([]);
  console.log(localStorage.getItem('role'));
  let [role, changeRole] = useState(localStorage.getItem('role')); // локал сторейдж это при первой инициализации и устанавливаем в сторейдж значение неопределено
  //а потом просто его меняем 
  const user_id = localStorage.getItem('user_id');
  const parsedUserId = user_id ? JSON.parse(user_id) : 0; // Или любое другое значение по

  const user_name = localStorage.getItem('user_name');
  const parsedUserName = user_name ? JSON.parse(user_name) : 0; // Или любое другое значение по

  const user_surname = localStorage.getItem('user_surname');
  const parsedUserSurname = user_surname ? JSON.parse(user_surname) : 0; // Или любое другое значение по
  return (
    <Router>
    <div className="App">
      <AppBarComponent role={role} changeRole={changeRole}/> {/* Статичная шапка */}
      {/* <CourseLoader setCourses={setCourses}/> */}
      <Routes>
        {/* засунуть проверку если пользователь авторизован то сразу на курсы переводить */}
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage role={role} changeRole={changeRole}/>} />
        <Route path="/courses" element={<CoursePage courses={courses} setCourses={setCourses} user_id={parsedUserId} user_name={parsedUserName} user_surname={parsedUserSurname} />} />
        <Route path="/modules/:id" element={<ModulePage modules={modules} setModules={setModules}/>} />
        <Route path="/lessons/:module_id/:user_id" element={<LessonPage lessons={lessons} setLessons={setLessons}/>} />
        <Route path="/tasks/:lesson_id/:user_id" element={<TaskPage tasks={tasks} setTasks={setTasks}/>} />
        <Route path="/score" element={<ScorePage score={score} setScore={setScore}/>} />
        <Route path="/rating" element={<RatingPage courses={courses} setCourses={setCourses} user_id={parsedUserId}/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
