import { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api';
import toast from 'react-hot-toast';

const statusOptions = ['Booked', 'Delivered', 'Cancelled'];

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await api.get('/bookings/admin');
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await api.put(`/bookings/admin/${id}/status`, { status: newStatus });
    toast.success('Status updated');
    fetchBookings();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    await api.delete(`/bookings/admin/${id}`);
    toast.success('Booking removed');
    fetchBookings();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Bookings
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Car</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b, i) => (
            <TableRow key={b.booking_id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{b.customer_name}</TableCell>
              <TableCell>
                {b.car_name} ({b.model})
              </TableCell>
              <TableCell>{b.booking_date}</TableCell>
              <TableCell>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <Select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.booking_id, e.target.value)}
                  >
                    {statusOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => handleDelete(b.booking_id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
