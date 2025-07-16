import React, { useEffect, useState } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UsersIcon
} from 'lucide-react';

const currency = import.meta.env.VITE_CURRENCY;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalUser: 0,
    activeShows: []
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: 'Total Bookings',
      icon: ChartLineIcon,
      value: dashboardData.totalBookings || 0
    },
    {
      title: 'Total Revenue',
      icon: CircleDollarSignIcon,
      value: `${currency}${dashboardData.totalRevenue || 0}`
    },
    {
      title: 'Active Shows',
      icon: PlayCircleIcon,
      value: dashboardData.activeShows.length || 0
    },
    {
      title: 'Total Users',
      icon: UsersIcon,
      value: dashboardData.totalUser || 0
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setDashboardData(dummyDashboardData);
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex flex-col gap-2 shadow-sm"
          >
            <card.icon className="text-primary w-6 h-6" />
            <p className="text-gray-400 text-sm">{card.title}</p>
            <p className="text-xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Active Shows Section */}
      <p className="mt-10 text-lg font-medium">Active Shows</p>

      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-60 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="h-60 w-full object-cover"
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>

            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency}
                {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-primary"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.62 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                </svg>
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>

            <p className="px-2 pt-2 text-sm text-gray-500">
              {new Date(show.showDateTime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { dummyDashboardData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, UsersIcon } from 'lucide-react';

// const currency = import.meta.env.VITE_CURRENCY || '$';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     totalUser: 0,
//     activeShows: []
//   });
//   const [loading, setLoading] = useState(true);

//   const dashboardCards = [
//     {
//       title: 'Total Bookings',
//       icon: ChartLineIcon,
//       value: dashboardData.totalBookings || 0
//     },
//     {
//       title: 'Total Revenue',
//       icon: CircleDollarSignIcon,
//       value: `${currency}${dashboardData.totalRevenue || 0}`
//     },
//     {
//       title: 'Active Shows',
//       icon: PlayCircleIcon,
//       value: dashboardData.activeShows.length || 0
//     },
//     {
//       title: 'Total Users',
//       icon: UsersIcon,
//       value: dashboardData.totalUser || 0
//     }
//   ];

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setDashboardData(dummyDashboardData);
//       setLoading(false);
//     };
//     fetchDashboardData();
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-xl font-semibold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {dashboardCards.map((card, index) => {
//           const Icon = card.icon;
//           return (
//             <div
//               key={index}
//               className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex flex-col gap-2 shadow-sm"
//             >
//               <Icon className="text-primary w-6 h-6" />
//               <p className="text-gray-400 text-sm">{card.title}</p>
//               <p className="text-xl font-bold">{card.value}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
