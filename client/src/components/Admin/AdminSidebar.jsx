import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon
} from 'lucide-react';

const AdminSidebar = () => {
  const user = {
    firstName: 'Admin',
    lastName: 'Admin',
    imageUrl: assets.profile,
  };

  const adminNavLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      name: 'Add Shows',
      path: '/admin/add-shows',
      icon: PlusSquareIcon,
    },
    {
      name: 'List Shows',
      path: '/admin/list-shows',
      icon: ListIcon,
    },
    {
      name: 'List Bookings',
      path: '/admin/list-bookings',
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
      <img
        className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-2 text-base max-md:hidden">{user.lastName}</p>

      <div className="w-full">
        {adminNavLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={index}
              to={link.path}
              end
              className={({ isActive }) =>
                `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 px-6 first:mt-6 text-gray-400 transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                  isActive ? 'bg-primary/15 text-primary font-medium' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <p className="max-md:hidden">{link.name}</p>
                  {isActive && (
                    <span className="w-1.5 h-10 rounded-l bg-primary absolute right-0" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { assets } from '../../assets/assets';
// import { LayoutDashboardIcon, PlusSquareIcon, ListIcon, ListCollapseIcon } from 'lucide-react';

// const AdminSidebar = () => {
//   const user = {
//     firstName: 'Admin',
//     lastName: 'Admin',
//     imageUrl: assets.profile,
//   };

//   const adminNavLinks = [
//     {
//       name: 'Dashboard',
//       path: '/admin',
//       icon: LayoutDashboardIcon,
//     },
//     {
//       name: 'Add Shows',
//       path: '/admin/add-shows',
//       icon: PlusSquareIcon,
//     },
//     {
//       name: 'List Shows',
//       path: '/admin/list-shows',
//       icon: ListIcon,
//     },
//     {
//       name: 'List Bookings',
//       path: '/admin/list-bookings',
//       icon: ListCollapseIcon,
//     },
//   ];

//   return (
//     <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
//       <img className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto" src={user.imageUrl} alt="sidebar" />
//       <p className="mt-2 text-base max-md:hidden">{user.lastName}</p>

//       <div className="w-full">
//         {adminNavLinks.map((link, index) => (
//           <NavLink
//             key={index}
//             to={link.path} end 
//             className={({ isActive }) =>
//               `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 px-6 first:mt-6 text-gray-400 transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
//                 isActive ? 'bg-primary/15 text-primary font-medium' : ''
//               }`
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <link.icon className="w-5 h-5" />
//                 <p className="max-md:hidden">{link.name}</p>
//                 {isActive && (
//                   <span className="w-1.5 h-10 rounded-l bg-primary absolute right-0" />
//                 )}
//               </>
//             )}
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
