import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAccessToken } from './helpers/apiHelper';

// Import Halaman Auth
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';

// Import Komponen Navbar
import NavbarComponent from './features/lost-founds/components/NavbarComponent';

// ProtectedRoute mengecek ketersediaan token secara langsung
const ProtectedRoute = ({ children }) => {
  const token =
    localStorage.getItem('token') ||
    localStorage.getItem('accessToken') ||
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('token') ||
    sessionStorage.getItem('accessToken') ||
    getAccessToken();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

// Layout Komponen Halaman Utama/Terproteksi
const DummyPage = ({ title }) => (
  <div className="min-h-screen bg-gray-50">
    <NavbarComponent />
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">
        Selamat datang di platform Delcom Lost & Found.
      </p>
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Path Publik */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      {/* Path Terproteksi (Wajib Login) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DummyPage title="Halaman Utama" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lost-founds"
        element={
          <ProtectedRoute>
            <DummyPage title="Daftar Barang Hilang" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lost-founds/add"
        element={
          <ProtectedRoute>
            <DummyPage title="Tambah Laporan Barang" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DummyPage title="Profil Pengguna" />
          </ProtectedRoute>
        }
      />

      {/* Fallback Rute */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;