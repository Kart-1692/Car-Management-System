import { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await api.get('/bookings/my');
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    await api.delete(`/bookings/${id}`);
    toast.success('Booking cancelled');
    fetchBookings();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Car</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.booking_id}>
              <TableCell>
                {b.car_name} ({b.model})
              </TableCell>
              <TableCell>{b.booking_date}</TableCell>
              <TableCell>{b.status}</TableCell>
              <TableCell align="right">
                {b.status === 'Booked' && (
                  <Tooltip title="Cancel">
                    <IconButton color="error" onClick={() => handleCancel(b.booking_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
