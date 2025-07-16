import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/Admin/Title';
import Loading from '../../components/Loading';

const currency = import.meta.env.VITE_CURRENCY;

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const simulatedShows = [
        {
          movie: dummyShowsData[0],
          showDateTime: '2025-07-15T16:30:00.000Z',
          showPrice: 59,
          occupiedSeats: {
            A1: 'user1',
            A2: 'user2',
            A3: 'user3',
          },
        },
        {
          movie: dummyShowsData[1],
          showDateTime: '2025-07-20T19:00:00.000Z',
          showPrice: 75,
          occupiedSeats: {
            A1: 'user1',
            B1: 'user2',
          },
        },
      ];
      setShows(simulatedShows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      <Title text1="List" text2="Shows" />

      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 pl-5 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Booked</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 pl-5 min-w-[180px]">{show.movie.title}</td>
                <td className="p-2">
                  {new Date(show.showDateTime).toLocaleString()}
                </td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats || {}).length}
                </td>
                <td className="p-2">
                  {currency}
                  {Object.keys(show.occupiedSeats || {}).length *
                    show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListShows;
