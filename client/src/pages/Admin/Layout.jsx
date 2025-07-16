// import React from 'react';
// import AdminNavbar from '../../components/Admin/AdminNavbar';
// import AdminSidebar from '../../components/Admin/AdminSidebar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Addshows from './Addshows';
import Listshows from './Listshows';
import Listbooking from './Listbooking';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const Layout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="add-shows" element={<Addshows />} />
            <Route path="list-shows" element={<Listshows />} />
            <Route path="list-bookings" element={<Listbooking />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
