import { Outlet, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout, user } = useContext(AuthContext);
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'var(--tata-blue)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tata Motors – Admin ({user?.username})
          </Typography>
          <Button color="inherit" component={NavLink} to="/" end>
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/admin/cars">
            Cars
          </Button>
          <Button color="inherit" component={NavLink} to="/admin/customers">
            Customers
          </Button>
          <Button color="inherit" component={NavLink} to="/admin/bookings">
            Bookings
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
