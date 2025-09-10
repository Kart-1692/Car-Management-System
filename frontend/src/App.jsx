import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import CarsManagement from './pages/Admin/CarsManagement';
import CustomersManagement from './pages/Admin/CustomersManagement';
import BookingsManagement from './pages/Admin/BookingsManagement';
import CustomerDashboard from './pages/Customer/Dashboard';
import CarsCatalog from './pages/Customer/CarsCatalog';
import MyBookings from './pages/Customer/MyBookings';
import AdminLayout from './components/layout/AdminLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Admin area */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin/cars" element={<CarsManagement />} />
              <Route path="/admin/customers" element={<CustomersManagement />} />
              <Route path="/admin/bookings" element={<BookingsManagement />} />
            </Route>
          </Route>
          {/* Customer area */}
          <Route element={<ProtectedRoute allowedRoles={['Customer']} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/cars" element={<CarsCatalog />} />
              <Route path="/customer/bookings" element={<MyBookings />} />
            </Route>
          </Route>
          {/* Fallback */}
          <Route path="*" element={<h2 className="text-center mt-4">404 – Page not found</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
