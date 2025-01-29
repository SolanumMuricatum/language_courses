import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../elements/Button';
import { CourseLoader } from '../connection/loadCourses';

export function HelpPage() {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '200px'}}>
        <h2>Если у вас возникли проблемы, напишите в техподдержку:</h2>
        <h2 style={{fontStyle: 'inherit'}}>help@languagecourses.by</h2>
      </div>
    </>
  );
}