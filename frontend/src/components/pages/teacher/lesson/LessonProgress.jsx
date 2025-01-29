import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ProgressLoader } from '../../../connection/loadProgress';

export function LessonProgress({progress, setProgress}) {
  return (
    <>
      <ProgressLoader setProgress={setProgress} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <div style={{ textAlign: 'center', maxWidth: 600, paddingBottom: '20px' }}>
        <p><strong>Прогресс сотрудников по уроку</strong></p>
      </div>
      <TableContainer component={Paper} style={{ width: 600, maxHeight: 425, overflowY: 'auto', marginBottom: '20px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Фамилия</strong></TableCell>
              <TableCell><strong>Имя</strong></TableCell>
              <TableCell><strong>Процент выполнения урока</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progress.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};