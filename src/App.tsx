import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { useAuth } from './context/AuthContext';
import Auth from './pages/Auth';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const CreateVisa = React.lazy(() => import('./pages/CreateVisa'));
const VisaList = React.lazy(() => import('./pages/VisaList'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-visa" element={<CreateVisa />} />
            <Route path="/visa-list" element={<VisaList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;