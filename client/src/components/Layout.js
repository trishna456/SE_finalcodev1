import React from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu } from './../Data/data';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };

  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Apply as Doctor',
      path: '/apply-doctor',
      icon: 'fa-solid fa-user-doctor',
    },
    {
      name: 'Apply as Insurance Provider',
      path: '/apply-insuranceProvider',
      icon: 'fa-solid fa-notes-medical',
    },

    // {
    //   name: 'Profile',
    //   path: '/profile',
    //   icon: 'fa-solid fa-user',
    // },
    {
      name: 'Profile',
      path: `/patient/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Insurance Package',
      path: '/insurance',
      icon: 'fa-solid fa-shield-alt',
    },
  ];

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-list',
    },

    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
  ];
  // =========== doctor menu ===============

  // =========== insurance provider menu ===============
  const insuranceProviderMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
  ];
  // =========== insurance provider menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : user?.isInsuranceProvider
    ? insuranceProviderMenu
    : userMenu;
  return (
    <>
      <div className='main'>
        <div className='layout'>
          <div className='sidebar'>
            <div className='logo'>
              <h6 className='text-light'>HEALYO</h6>
              <hr />
            </div>
            <div className='menu'>
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && 'active'}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className='fa-solid fa-right-from-bracket'></i>
                <Link to='/login'>Logout</Link>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='header'>
              <div className='header-content' style={{ cursor: 'pointer' }}>
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => {
                    navigate('/notification');
                  }}
                >
                  <i className='fa-solid fa-bell'></i>
                </Badge>

                <Link to='/profile'>{user?.name}</Link>
              </div>
            </div>
            <div className='body'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
