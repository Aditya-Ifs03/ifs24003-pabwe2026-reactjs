import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const authUser = useSelector((state) => state.auth.authUser);

  // Jika pengguna sudah login, redirect ke halaman utama
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Visual Banner (Disembunyikan di layar kecil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 justify-center items-center">
        <div className="text-white text-center p-10">
          <h1 className="text-5xl font-bold mb-4">Delcom Lost & Founds</h1>
          <p className="text-lg">Temukan barangmu yang hilang atau laporkan barang yang kamu temukan di sekitar kampus.</p>
        </div>
      </div>
      
      {/* Kontainer Form Autentikasi */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;