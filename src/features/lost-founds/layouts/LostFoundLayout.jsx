import { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarComponent from '../components/SidebarComponent';
import NavbarComponent from '../components/NavbarComponent';
import { asyncGetProfile } from '../../users/states/userSlice';
import { getAccessToken } from '../../../helpers/apiHelper';

const LostFoundLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.authUser);
  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      dispatch(asyncGetProfile()).unwrap().catch(() => {
        // Jika token tidak valid saat memuat profil, kembalikan ke login
        navigate('/auth/login');
      });
    }
  }, [dispatch, token, navigate]);

  if (!authUser && !token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SidebarComponent />
      <div className="flex-1 flex flex-col">
        <NavbarComponent />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LostFoundLayout;