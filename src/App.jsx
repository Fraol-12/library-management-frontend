import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<div className="p-8 text-center text-3xl font-bold text-gray-800">Home – Coming soon</div>} />
          <Route path="/login" element={<div className="p-8 text-center">Login page placeholder</div>} />
          <Route path="/register" element={<div className="p-8 text-center">Register page placeholder</div>} />
          <Route path="/catalog" element={<div className="p-8 text-center">Catalog placeholder</div>} />
          <Route path="/dashboard" element={<div className="p-8 text-center">Dashboard (protected) placeholder</div>} />
          <Route path="*" element={<div className="p-8 text-center text-red-600">404 – Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;