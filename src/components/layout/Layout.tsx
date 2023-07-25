import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Modes, Roles } from '../../consts/consts';
import AdminLayout from './AdminLayout';
import UserLayout from './UserLayout';

const Layout: FC = () => {
  const mode = useAppSelector((state) => state.UserData.mode);
  const userRole = useAppSelector((state) => state.UserData.user?.role.name);

  if (mode === Modes.Admin && userRole === Roles.Admin) {
    return <AdminLayout />;
  } else {
    return <UserLayout />;
  }
};

export default Layout;
