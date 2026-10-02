import { NavLink } from 'react-router-dom';
import { IconLayoutDashboard, IconUsers, IconUserCircle } from '@tabler/icons-react';
import clsx from 'clsx';

const SidebarComponent = () => {
  const menus = [
    { name: 'Dashboard', path: '/', icon: <IconLayoutDashboard size={20} /> },
    { name: 'Pengguna', path: '/users', icon: <IconUsers size={20} /> },
    { name: 'Profil Saya', path: '/profile', icon: <IconUserCircle size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600">Lost & Found</h2>
      </div>
      <nav className="flex flex-col gap-2 px-4 mt-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
              isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {menu.icon}
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarComponent;