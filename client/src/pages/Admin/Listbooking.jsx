import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Title from '../../components/Admin/Title';
import Loading from '../../components/Loading';

const currency = import.meta.env.VITE_CURRENCY;

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      setBookings(dummyBookingData); // Simulate API fetch
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 pl-5 font-medium">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 pl-5 min-w-[150px]">{item.user.name}</td>
                <td className="p-2 min-w-[180px]">{item.show.movie.title}</td>
                <td className="p-2">
                  {new Date(item.show.showDateTime).toLocaleString()}
                </td>
                <td className="p-2">
                  {item.bookedSeats.join(', ')}
                </td>
                <td className="p-2">
                  {currency}
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBookings;
