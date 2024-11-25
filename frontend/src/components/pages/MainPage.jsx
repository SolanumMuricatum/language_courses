import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../elements/Button';
import { CourseLoader } from '../connection/loadCourses';

export function MainPage() {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '200px'}}>
        <img src='photo/meme.jpg' style={{height: '100px', width: '100px'}}></img>
        <h2>Чтобы продолжить работу, пожалуйста, авторизуйтесь</h2>
      </div>
    </>
  );
}