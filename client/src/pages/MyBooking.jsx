// import React, { useEffect, useState } from 'react';
// import { dummyBookingData } from '../assets/assets';
// import BlurCircle from '../components/Blurcircle';
// import Loading from '../components/Loading';
// import timeFormat from '../lib/timeformat';
// import { dateFormat } from '../lib/Dateformat';

// const currency = import.meta.env.VITE_CURRENCY || '₹';

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const getMyBookings = async () => {
//       setBookings(dummyBookingData);
//       setIsLoading(false);
//     };
//     getMyBookings();
//   }, []);

//   if (isLoading) return <Loading />;

//   return (
//     <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
//       <BlurCircle top="-80px" left="-60px" />
//       <BlurCircle bottom="0" right="-80px" />
      
//       <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

//       {bookings.length === 0 ? (
//         <p className="text-gray-400">You haven’t made any bookings yet.</p>
//       ) : (
//         bookings.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row justify-between bg-primary/5 border border-primary/20 rounded-lg mt-4 p-4 max-w-3xl"
//           >
//             {/* Poster */}
//             <img
//               src={item.show.movie.poster_path}
//               alt={item.show.movie.title}
//               className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
//             />

//             {/* Info */}
//             <div className="flex flex-col p-4 space-y-1 flex-1">
//               <p className="text-lg font-semibold">{item.show.movie.title}</p>
//               <p className="text-gray-400 text-sm">{timeFormat(item.show.movie.runtime)} mins</p>
//               <p className="text-gray-400 text-sm">Showtime: {dateFormat(item.show.showDateTime)}</p>
//               <p className="text-gray-400 text-sm">Seats: {Array.isArray(item.bookedSeats) ? item.bookedSeats.join(', ') : 'N/A'}</p>
//               <p className="mt-2 font-medium">
//                 Total Paid: {currency}
//                 {item.totalAmount}
//               </p>
//             </div>
//           </div>



//         ))
//       )}
//     </div>
//   );
// };

// export default MyBookings;
import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../assets/assets';
import BlurCircle from '../components/Blurcircle';
import Loading from '../components/Loading';
import timeFormat from '../lib/timeformat';
import { dateFormat } from '../lib/Dateformat';

const currency = import.meta.env.VITE_CURRENCY || '₹';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMyBookings = async () => {
      setBookings(dummyBookingData);
      setIsLoading(false);
    };
    getMyBookings();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="-80px" left="-60px" />
      <BlurCircle bottom="0" right="-80px" />
      
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">You haven’t made any bookings yet.</p>
      ) : (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/5 border border-primary/20 rounded-lg mt-4 p-4 max-w-3xl"
          >
            {/* Poster */}
            <img
              src={item.show.movie.poster_path}
              alt={item.show.movie.title}
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
            />

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 md:items-end md:text-right p-4">
              <div>
                <p className="text-lg font-semibold">{item.show.movie.title}</p>
                <p className="text-gray-400 text-sm">{timeFormat(item.show.movie.runtime)} mins</p>
                <p className="text-gray-400 text-sm">Showtime: {dateFormat(item.show.showDateTime)}</p>
                <p className="text-gray-400 text-sm">
                  <span className="text-gray-400">Total Tickets:</span> {item.bookedSeats.length}
                </p>
                <p className="text-gray-400 text-sm mb-2">
                  <span className="text-gray-400">Seat Numbers:</span> {item.bookedSeats.join(', ')}
                </p>
                <p className="text-base font-medium mb-2">
                  Total Amount: {currency}{item.amount}
                </p>
              </div>

              {/* Pay Now button */}
              {!item.isPaid && (
                <button className="bg-primary px-4 py-1.5 text-sm rounded-full font-medium cursor-pointer hover:bg-primary/80 transition">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
