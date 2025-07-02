// src/app/App.tsx
import { Route, Routes } from 'react-router';
import AllProducts from '../features/products/AllProducts';
import ChatHomeScreen from '../pages/chat/ChatHomeScreen';
import TravelPlannerHome from '../pages/travel/TravelPlannerHome';
import '../styles/App.css';

function App() {
  return (
    <Routes>
      {/* Home route - Travel Planner */}
      <Route path="/" element={<TravelPlannerHome />} />

      {/* Other specific routes */}
      <Route path="/products" element={<AllProducts />} />
      <Route path="/chat" element={<ChatHomeScreen />} />
      {/* 
      <Route path="/about" element={<AboutPage />} /> 
      */}

      {/* 404 Route - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Simple 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

export default App;