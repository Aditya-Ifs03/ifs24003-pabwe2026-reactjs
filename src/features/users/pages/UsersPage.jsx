import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllUsers } from '../states/userSlice';
import { IconUser } from '@tabler/icons-react';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, isUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Pengguna</h1>
      
      {isUsers === 'pending' ? (
        <p className="text-gray-500">Memuat data pengguna...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <IconUser size={24} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;