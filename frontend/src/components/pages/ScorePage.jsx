import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ScoreLoader } from '../connection/loadScore';

export function ScorePage({score, setScore}) {
  return (
    <>
      <ScoreLoader setScore={setScore} score={score}/>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <div style={{ textAlign: 'center', maxWidth: 600, paddingBottom: '20px' }}>
        <p><strong>Бонусы начисляются по следующей системе: </strong> 1 - если урок выполнен меньше, чем на 50%, 2 - если урок выполнен больше, чем на 50%</p>
      </div>
      <TableContainer component={Paper} style={{ width: 600, maxHeight: 425, overflowY: 'auto', marginBottom: '20px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Фамилия</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Бонусы</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {score.map((row, index) => (
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