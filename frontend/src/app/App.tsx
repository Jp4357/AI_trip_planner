// src/app/App.tsx
import { Route, Routes } from 'react-router';
import TravelPlannerHome from '../pages/travel/TravelPlannerHome';
import { useTheme } from '../hooks/useTheme';
import '../styles/App.css';

function App() {
  // Initialize theme system (this will handle the DOM classes)
  useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Routes>
        {/* Home route - Travel Planner */}
        <Route path="/" element={<TravelPlannerHome />} />
        {/* 404 Route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// Simple 404 component with dark theme support
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-200">Page not found</p>
      <a
        href="/"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
      >
        Go Home
      </a>
    </div>
  </div>
);

export default App;