import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Catalog from '../pages/Catalog';
import BookDetail from '../pages/BookDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div className="p-10 text-center text-3xl font-bold text-gray-800">Home – Coming soon</div>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/catalog" element={ < Catalog /> } />
      <Route path="/books/:id" element={ <BookDetail />}  />
      
      {/* protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>

      <Route path="*" element={<div className="p-10 text-center text-4xl text-red-600">404 – Page not found</div>} />
    </Routes>
  );
}

