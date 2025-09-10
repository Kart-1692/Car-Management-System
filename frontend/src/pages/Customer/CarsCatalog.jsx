import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import api from '../../api';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

export default function CarsCatalog() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDate, setBookingDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [open, setOpen] = useState(false);

  const fetchCars = async () => {
    const { data } = await api.get('/cars');
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleBook = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const submitBooking = async () => {
    try {
      await api.post('/bookings', {
        car_id: selectedCar.car_id,
        booking_date: bookingDate,
      });
      toast.success('Booking created');
      setOpen(false);
    } catch (err) {
      // handled globally
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.car_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{car.name}</Typography>
                <Typography>{car.model}</Typography>
                <Typography>₹{car.price}</Typography>
                <Typography>Color: {car.color}</Typography>
                <Typography>Fuel: {car.fuel}</Typography>
                <Typography>
                  Transmission: {car.transmission}
                </Typography>
                <Typography>Available: {car.availability}</Typography>
              </CardContent>
              <Button
                variant="contained"
                fullWidth
                disabled={car.availability <= 0}
                onClick={() => handleBook(car)}
                sx={{ borderRadius: 0 }}
              >
                Book Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book {selectedCar?.name}</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            label="Booking Date"
            fullWidth
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitBooking}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
