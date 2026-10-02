import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../auth/states/authSlice';
import { showConfirmDialog } from '../../../helpers/toolsHelper';
import { IconLogout } from '@tabler/icons-react';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await showConfirmDialog('Keluar', 'Apakah Anda yakin ingin keluar?');
    if (result.isConfirmed) {
      dispatch(authLogout());
      navigate('/auth/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-6 sticky top-0 z-10">
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium transition"
      >
        <IconLogout size={20} />
        Keluar
      </button>
    </header>
  );
};

export default NavbarComponent;