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

export default function CustomersManagement() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const { data } = await api.get('/users');
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    await api.delete(`/users/${id}`);
    toast.success('Customer removed');
    fetchCustomers();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Customers
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c, i) => (
            <TableRow key={c.user_id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{c.username}</TableCell>
              <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => handleDelete(c.user_id)}>
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
