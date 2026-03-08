import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Catalog from '../pages/Catalog';
import BookDetail from '../pages/BookDetail';
import StaffDashboard from '../pages/StaffDashboard';
import Landing from '../pages/Landing';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/catalog" element={ < Catalog /> } />
      <Route path="/books/:id" element={ <BookDetail />}  />
      <Route path="/staff/dashboard" element={<StaffDashboard />} />
      
      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>

      <Route path="*" element={<div className="p-10 text-center text-4xl text-red-600">404 – Page not found</div>} />
    </Routes>
  );
}

