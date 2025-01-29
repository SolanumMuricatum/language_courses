import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { json, Link } from 'react-router-dom';
import { AppBarButtonFunction } from './LoginLogoutButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';

export function AppBarComponent({role, changeRole}) {
  const userRole = localStorage.getItem('role');
  
  const [drawerOpen, setDrawerOpen] = React.useState(false); // Состояние для бокового меню

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#33266E' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {userRole ? ( // Проверяем, есть ли роль
              <Link to="/courses">
                <Button sx={{ color: 'white', fontSize: '13pt' }}>Language Courses</Button>
              </Link>
            ) : (
              <Link to="/">
                <Button sx={{ color: 'white', fontSize: '13pt' }}>Language Courses</Button>
              </Link>
            )}
          </Typography>
          <AppBarButtonFunction role={role} changeRole={changeRole}/>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {}} // Закрыть меню
      >
        <AppBar position="static" sx={{ backgroundColor: '#33266E' }}>
          <Toolbar>
            <ListItemText sx={{ flexGrow: 1 }} />
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(false)}>
              <CloseIcon /> {/* Иконка закрытия */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <List style={{ width: '200px' }}>
        <ListItem onClick={toggleDrawer(false)}>
          <Link to="/score" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black', fontSize: 'inherit', fontFamily: 'Arial, sans-serif', textTransform: 'none'}}>Рейтинг</Button>
          </Link>
        </ListItem>
          {userRole==='"user"'  && ( // Проверяем, есть ли роль
            <ListItem onClick={toggleDrawer(false)}>
                <Link to="/rating" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'black', fontSize: 'inherit', fontFamily: 'Arial, sans-serif', textTransform: 'none'}}>Оценить курс</Button>
                </Link>
            </ListItem>
          )}
          {userRole==='"admin"'  && ( // Проверяем, есть ли роль
            <ListItem onClick={toggleDrawer(false)}>
                <Link to="/backup" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'black', fontSize: 'inherit', fontFamily: 'Arial, sans-serif', textTransform: 'none'}}>Бэкап</Button>
                </Link>
            </ListItem>
          )}
          {userRole==='"admin"'  && ( // Проверяем, есть ли роль
            <ListItem onClick={toggleDrawer(false)}>
                <Link to="/users" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'black', fontSize: 'inherit', fontFamily: 'Arial, sans-serif', textTransform: 'none'}}>Пользователи</Button>
                </Link>
            </ListItem>
          )}
          <ListItem onClick={toggleDrawer(false)}>
            <Link to="/help" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'black', fontSize: 'inherit', fontFamily: 'Arial, sans-serif', textTransform: 'none'}}>Помощь</Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
