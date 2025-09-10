import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const fuelOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissionOptions = ['Manual', 'Automatic'];

export default function CarForm({ open, onClose, initialValues, onSubmit }) {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    model: Yup.string().required('Model is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    color: Yup.string().required('Color is required'),
    fuel: Yup.string().oneOf(fuelOptions, 'Invalid fuel type').required('Fuel is required'),
    transmission: Yup.string()
      .oneOf(transmissionOptions, 'Invalid transmission type')
      .required('Transmission is required'),
    availability: Yup.number()
      .integer('Availability must be an integer')
      .min(0, 'Availability cannot be negative')
      .required('Availability is required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      model: '',
      price: '',
      color: '',
      fuel: fuelOptions[0],
      transmission: transmissionOptions[0],
      availability: 0,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues ? 'Edit Car' : 'Add New Car'}</DialogTitle>
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
            error={formik.touched.fuel && Boolean(formik.errors.fuel)}
            helperText={formik.touched.fuel && formik.errors.fuel}
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
            error={formik.touched.transmission && Boolean(formik.errors.transmission)}
            helperText={formik.touched.transmission && formik.errors.transmission}
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
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="car-form"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          {initialValues ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
