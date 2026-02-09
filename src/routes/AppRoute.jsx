import { Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div className="p-10 text-center text-3xl font-bold text-gray-800">Home – Coming soon</div>} />
      <Route path="/login" element={<div className="p-10 text-center text-2xl">Login page (placeholder)</div>} />
      <Route path="/register" element={<div className="p-10 text-center text-2xl">Register page (placeholder)</div>} />
      <Route path="/catalog" element={<div className="p-10 text-center text-2xl">Catalog (public) – placeholder</div>} />
      <Route path="/dashboard" element={<div className="p-10 text-center text-2xl">Dashboard (protected) – placeholder</div>} />
      <Route path="*" element={<div className="p-10 text-center text-4xl text-red-600">404 – Page not found</div>} />
    </Routes>
  );
}