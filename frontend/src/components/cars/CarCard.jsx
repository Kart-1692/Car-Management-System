import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CarCard({ car, onEdit, onDelete }) {
  return (
    <Card sx={{ minWidth: 260 }}>
      <CardContent>
        <Typography variant="h6">{car.name}</Typography>
        <Typography variant="subtitle2">{car.model}</Typography>
        <Typography>Price: ₹{car.price}</Typography>
        <Typography>Color: {car.color}</Typography>
        <Typography>Fuel: {car.fuel}</Typography>
        <Typography>Transmission: {car.transmission}</Typography>
        <Typography>Available: {car.availability}</Typography>
      </CardContent>
      <CardActions>
        {onEdit && (
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => onEdit(car)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(car.car_id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
