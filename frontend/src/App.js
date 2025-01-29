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
import { HelpPage } from './components/pages/HelpPage';
import { ModuleUpdate } from './components/pages/teacher/module/ModuleUpdate';
import { ModuleAdd } from './components/pages/teacher/module/ModuleAdd';
import { LessonUpdate } from './components/pages/teacher/lesson/LessonUpdate';
import { LessonAdd } from './components/pages/teacher/lesson/LessonAdd';
import { TaskUpdate } from './components/pages/teacher/task/TaskUpdate';
import { TaskAdd } from './components/pages/teacher/task/TaskAdd';
import { LessonProgress } from './components/pages/teacher/lesson/LessonProgress';
import { CourseAdd } from './components/pages/admin/CourseAdd';
import { CourseUpdate } from './components/pages/admin/CourseUpdate';
import { UserPage } from './components/pages/admin/user/UserPage';
import { UserAdd } from './components/pages/admin/user/UserAdd';
import { UserUpdate } from './components/pages/admin/user/UserUpdate';
import { CourseAccess } from './components/pages/admin/CourseAccess';
import { CourseAddAccess } from './components/pages/admin/CourseAddAccess';
import { Backup } from './components/pages/Backup';

function App() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [score, setScore] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState([]);
  const [users, setUsers] = useState([]);
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
      <Routes>
        {/* засунуть проверку если пользователь авторизован то сразу на курсы переводить */}
        {role ? ( // Проверяем, есть ли роль
          <Route path="/" element={<CoursePage courses={courses} setCourses={setCourses} user_id={parsedUserId} user_name={parsedUserName} user_surname={parsedUserSurname} />}/>
              ) : (
          <Route path="/" element={<MainPage/>}/>
              )};
        <Route path="/login" element={<LoginPage role={role} changeRole={changeRole}/>} />
        <Route path="/courses" element={<CoursePage courses={courses} setCourses={setCourses} user_id={parsedUserId} user_name={parsedUserName} user_surname={parsedUserSurname} />} />
        <Route path="/modules/:id" element={<ModulePage modules={modules} setModules={setModules}/>} />
        <Route path="/lessons/:module_id/:user_id" element={<LessonPage lessons={lessons} setLessons={setLessons}/>} />
        <Route path="/tasks/:lesson_id/:user_id" element={<TaskPage tasks={tasks} setTasks={setTasks}/>} />
        <Route path="/score" element={<ScorePage score={score} setScore={setScore}/>} />
        <Route path="/rating" element={<RatingPage courses={courses} setCourses={setCourses} user_id={parsedUserId}/>} />
        <Route path="/users" element={<UserPage users={users} setUsers={setUsers}/>}/>
        <Route path="/help" element={<HelpPage/>} />

        <Route path="/edit/module/:module_id" element={<ModuleUpdate modules={modules} setModules={setModules}/>} />
        <Route path="/add/module/:course_id" element={<ModuleAdd/>} />

        <Route path="/edit/lesson/:lesson_id" element={<LessonUpdate lessons={lessons} setLessons={setLessons}/>} />
        <Route path="/add/lesson/:module_id" element={<LessonAdd/>} />
        <Route path="/progress/lesson/:lesson_id" element={<LessonProgress progress={progress} setProgress={setProgress}/>} />

        <Route path="/edit/task/:task_id" element={<TaskUpdate tasks={tasks} setTasks={setTasks}/>} />
        <Route path="/add/task/:lesson_id" element={<TaskAdd/>} />

        <Route path="/add/course" element={<CourseAdd courses={courses} setCourses={setCourses} user_id={parsedUserId}/>} />
        <Route path="/edit/course/:course_id" element={<CourseUpdate courses={courses} setCourses={setCourses}/>} />
        <Route path="/access/course/:course_id" element={<CourseAccess users={users} setUsers={setUsers}/>} />
        <Route path="/add/access/:course_id" element={<CourseAddAccess users={users} setUsers={setUsers}/>} />

        <Route path="/add/user" element={<UserAdd />} />
        <Route path="/edit/user/:user_id" element={<UserUpdate users={users} setUsers={setUsers}/>} />

        <Route path="/backup" element={<Backup/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
