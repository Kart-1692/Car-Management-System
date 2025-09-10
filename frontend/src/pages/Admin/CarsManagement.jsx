import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../../api';
import CarCard from '../../components/cars/CarCard';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const fuelOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissionOptions = ['Manual', 'Automatic'];

export default function CarsManagement() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchCars = async () => {
    const { data } = await api.get('/cars');
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this car?')) return;
    await api.delete(`/cars/${id}`);
    toast.success('Car deleted');
    fetchCars();
  };

  const handleEdit = (car) => {
    setEditing(car);
    formik.setValues({ ...car });
    setOpen(true);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    model: Yup.string().required(),
    price: Yup.number().positive().required(),
    color: Yup.string().required(),
    fuel: Yup.string().oneOf(fuelOptions).required(),
    transmission: Yup.string().oneOf(transmissionOptions).required(),
    availability: Yup.number().integer().min(0).required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      model: '',
      price: '',
      color: '',
      fuel: fuelOptions[0],
      transmission: transmissionOptions[0],
      availability: 0,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (editing) {
          await api.put(`/cars/${editing.car_id}`, values);
          toast.success('Car updated');
        } else {
          await api.post('/cars', values);
          toast.success('Car added');
        }
        fetchCars();
        setOpen(false);
        resetForm();
        setEditing(null);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.car_id}>
            <CarCard car={car} onEdit={handleEdit} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Dialog – Create / Edit */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Car' : 'Add New Car'}</DialogTitle>
        <DialogContent>
          <form id="car-form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="dense"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              label="Model"
              name="model"
              margin="dense"
              value={formik.values.model}
              onChange={formik.handleChange}
              error={formik.touched.model && Boolean(formik.errors.model)}
              helperText={formik.touched.model && formik.errors.model}
            />
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              margin="dense"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              fullWidth
              label="Color"
              name="color"
              margin="dense"
              value={formik.values.color}
              onChange={formik.handleChange}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
            />
            <TextField
              select
              fullWidth
              label="Fuel"
              name="fuel"
              margin="dense"
              value={formik.values.fuel}
              onChange={formik.handleChange}
            >
              {fuelOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Transmission"
              name="transmission"
              margin="dense"
              value={formik.values.transmission}
              onChange={formik.handleChange}
            >
              {transmissionOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Availability"
              name="availability"
              margin="dense"
              value={formik.values.availability}
              onChange={formik.handleChange}
              error={formik.touched.availability && Boolean(formik.errors.availability)}
              helperText={formik.touched.availability && formik.errors.availability}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            form="car-form"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {editing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
