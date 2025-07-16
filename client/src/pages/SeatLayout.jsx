// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { dummyShowsData, dummyDateTimeData } from '../assets/assets';
// import { ClockIcon } from 'lucide-react';
// import Loading from '../components/Loading'; // Make sure this component exists
// import isoTimeFormat from '../lib/isiTimeFormat';

// const SeatLayout = () => {
//   const { id, date } = useParams();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [show, setShow] = useState(null);
//   const navigate = useNavigate();
  
//   const renderSeat=(row, count=9)=>{

//   }

//   useEffect(() => {
//     const getShow = async () => {
//       const foundShow = dummyShowsData.find((show) => String(show.id) === String(id));
//       if (foundShow) {
//         setShow({
//           movie: foundShow,
//           dateTime: dummyDateTimeData,
//         });
//       }
//     };

//     getShow();
//   }, [id]);

//   if (!show) return <Loading />;

//   const times = show.dateTime[date] || [];

//   return (
//     <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
//       {/* Available Timings */}
//       <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
//         <p className="text-lg font-semibold px-6">Available Timings</p>
//         <div className="mt-5 space-y-1">
//           {times.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setSelectedTime(item)}
//               className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
//                 selectedTime?.time === item.time
//                   ? 'bg-primary text-white'
//                   : 'hover:bg-primary/20'
//               }`}
//             >
//               <ClockIcon className="w-4 h-4" />
//               <p className="text-sm">{isoTimeFormat(item.time) }</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* You can render seat layout, confirm button, price summary etc. here */}
//       {/* Example placeholder: */}
//       <div className="flex-1 mt-10 md:mt-0 md:ml-12">
//         {selectedTime ? (
//           <div className="text-white">
//             <h2 className="text-lg font-semibold mb-4">Seat Selection for {selectedTime.time}</h2>
//             {/* TODO: Add seat layout UI here */}
//           </div>
//         ) : (
//           <p className="text-gray-400">Please select a show time to continue.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeatLayout;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyShowsData, dummyDateTimeData, assets } from '../assets/assets';
import { ClockIcon, ArrowRightIcon } from 'lucide-react';
import BlurCircle from '../components/Blurcircle';
import Loading from '../components/Loading';
import isoTimeFormat from '../lib/isiTimeFormat';
import toast from 'react-hot-toast';

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getShow = async () => {
      const foundShow = dummyShowsData.find((show) => String(show.id) === String(id));
      if (foundShow) {
        const defaultSeatLayout = {
          A: 9,
          B: 9,
          C: 9,
          D: 9,
          E: 9,
          F: 9,
          G: 9,
        };

        setShow({
          movie: {
            ...foundShow,
            seatLayout: foundShow.seatLayout || defaultSeatLayout,
          },
          dateTime: dummyDateTimeData,
        });
      }
    };
    getShow();
  }, [id]);

  if (!show) return <Loading />;
  const times = show.dateTime[date] || [];

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error('Please select time first');
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error('You can only select 5 seats');
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => {
    return (
      <div key={row} className="flex gap-2 mt-2 justify-center">
        {Array.from({ length: count }).map((_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 text-sm cursor-pointer ${
                selectedSeats.includes(seatId)
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/10'
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    );
  };

  const seatLayout = show.movie.seatLayout || {};
  const allRows = Object.keys(seatLayout);
  const groupRows = [allRows.slice(0, 2), allRows.slice(2)];

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {times.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTime(item);
                setSelectedSeats([]);
              }}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/20'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex-1 mt-10 md:mt-0 md:ml-12">
        {selectedTime ? (
          <div className="relative flex flex-col items-center max-md:mt-16">
            <BlurCircle top="-100px" left="-100px" />
            <BlurCircle bottom="0" />
            <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
            <img src={assets.screenImage} alt="screen" />
            <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

            <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
                {groupRows[0].map((row) => renderSeats(row, seatLayout[row]))}
              </div>

              <div className="grid grid-cols-2 gap-11">
                {groupRows[1].map((row) => (
                  <div key={row}>
                    {renderSeats(row, seatLayout[row])}
                  </div>
                ))}
              </div>

              {selectedSeats.length > 0 && (
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="flex items-center gap-1 mt-10 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
                >
                  Proceed to Checkout
                  <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Please select a show time to continue.</p>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
