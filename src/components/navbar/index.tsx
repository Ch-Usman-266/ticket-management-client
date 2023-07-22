import React from 'react';
import TicketIcon from '../../svg/ticketIcon';
import { Outlet } from 'react-router-dom';
import getUserFromLocalStorage from '../../utils/getUserFromLocalStorage';
import { useNotificationContext } from '../../context/notificationContext';
import Notification from '../notification';

const Navbar = (): JSX.Element => {
  const user = getUserFromLocalStorage();
  const { notifications } = useNotificationContext();

  const logout = (): void => {
    localStorage.removeItem('user');

    window.location.reload();
  };

  console.log('the notifications are', notifications);

  return (
    <>
      <header className="header sticky dark:bg-sky-600 text-white top-0 shadow-md flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl">
          <a className="flex justify-center items-center" href="">
            <TicketIcon className="w-8 h-8 mr-2" />
            Ticketing
          </a>
        </h1>
        <div className="ml-auto">
          {user?.role && (
            <span className="text-lg font-semibold">
              {user.role.charAt(0).toUpperCase() +
                user.role.slice(1).toLowerCase()}
            </span>
          )}
          {user && (
            <button
              className="ml-4 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </header>
      <div className="dark:bg-gray-900 p-3 ">
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            type={notification.type}
            content={notification.content}
            index={index}
          />
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
