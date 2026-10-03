import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authLogout } from '../../auth/states/authSlice';
import { showConfirmDialog } from '../../../helpers/toolsHelper';
import { IconLogout } from '@tabler/icons-react';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = showConfirmDialog 
      ? await showConfirmDialog('Apakah Anda yakin ingin keluar?') 
      : window.confirm('Apakah Anda yakin ingin keluar?');

    if (confirmed) {
      dispatch(authLogout());
      navigate('/auth/login');
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide" aria-label="Halaman Utama Delcom Lost & Found">
          Delcom Lost & Found
        </Link>

        <nav aria-label="Navigasi Utama" className="flex items-center space-x-4">
          <Link 
            to="/lost-founds" 
            className="hover:underline font-medium text-sm sm:text-base"
            aria-label="Daftar Barang Hilang"
          >
            Barang Hilang
          </Link>

          <Link 
            to="/lost-founds/add" 
            className="hover:underline font-medium text-sm sm:text-base"
            aria-label="Tambah Laporkan Barang"
          >
            Tambah Laporan
          </Link>

          <button
            onClick={handleLogout}
            aria-label="Tombol Keluar dari Akun"
            title="Keluar"
            className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition duration-150 cursor-pointer"
          >
            <IconLogout size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavbarComponent;