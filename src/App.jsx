// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16"> {/* offset for fixed header */}
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}