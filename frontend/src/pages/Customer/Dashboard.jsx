import { Typography, Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>
      <Typography>
        Welcome! Browse the catalogue, make a booking, and manage your reservations.
      </Typography>
    </Box>
  );
}
