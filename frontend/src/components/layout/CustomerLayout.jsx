import { Outlet, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function CustomerLayout() {
  const { logout, user } = useContext(AuthContext);
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'var(--tata-blue)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tata Motors – Customer ({user?.username})
          </Typography>
          <Button color="inherit" component={NavLink} to="/customer" end>
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/customer/cars">
            Cars
          </Button>
          <Button color="inherit" component={NavLink} to="/customer/bookings">
            My Bookings
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}
