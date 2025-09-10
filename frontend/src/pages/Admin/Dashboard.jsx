import { Typography, Box, Grid, Paper, Link as MuiLink } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ cars: 0, customers: 0, bookings: 0 });

  const fetchStats = async () => {
    const [{ data: cars }, { data: customers }, { data: bookings }] = await Promise.all([
      api.get('/cars'),
      api.get('/users'),               // admin only – returns customers only
      api.get('/bookings/admin'),      // all bookings
    ]);
    setStats({ cars: cars.length, customers: customers.length, bookings: bookings.length });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5">{stats.cars}</Typography>
            <Typography>Cars in catalogue</Typography>
            <MuiLink href="/admin/cars">Manage Cars →</MuiLink>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5">{stats.customers}</Typography>
            <Typography>Registered customers</Typography>
            <MuiLink href="/admin/customers">Manage Customers →</MuiLink>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5">{stats.bookings}</Typography>
            <Typography>Total bookings</Typography>
            <MuiLink href="/admin/bookings">Manage Bookings →</MuiLink>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
