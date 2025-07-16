// import React, { useEffect, useState } from 'react';
// import { dummyShowsData } from '../../assets/assets';
// import Title from '../../components/Admin/Title';
// import { StarIcon } from 'lucide-react';
// import { kConverter } from '../../lib/Kconverting';

// const currency = import.meta.env.VITE_CURRENCY;

// const AddShows = () => {
//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [dateTimeInput, setDateTimeInput] = useState('');
//   const [showPrice, setShowPrice] = useState('');
//   const [dateTimeSelection, setDateTimeSelection] = useState({});

//   const fetchNowPlayingMovies = async () => {
//     setNowPlayingMovies(dummyShowsData);
//   };

//   useEffect(() => {
//     fetchNowPlayingMovies();
//   }, []);

//   const handleSelectMovie = (movie) => {
//     setSelectedMovie(movie);
//     setDateTimeInput('');
//     setShowPrice('');
//   };

//   return nowPlayingMovies.length > 0 ? (
//     <div className="p-4 md:p-8">
//       <Title text2="Shows" />
//       <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

//       <div className="overflow-x-auto pb-4">
//         <div className="flex flex-wrap gap-4 mt-4 w-max">
//           {nowPlayingMovies.map((movie) => (
//             <div
//               key={movie.id}
//               className={`relative max-w-40 cursor-pointer group hover:-translate-y-1 transition duration-300 ${
//                 selectedMovie?.id === movie.id ? 'ring-2 ring-primary' : ''
//               }`}
//               onClick={() => handleSelectMovie(movie)}
//             >
//               <div className="relative rounded-lg overflow-hidden">
//                 <img
//                   src={movie.poster_path}
//                   alt={movie.title}
//                   className="w-full h-60 object-cover brightness-90"
//                 />
//                 <div className="text-sm flex items-center justify-between px-2 py-1 bg-black/70 w-full absolute bottom-0">
//                   <div className="flex items-center gap-1 text-gray-200">
//                     <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                     {movie.vote_average.toFixed(1)}
//                   </div>
//                   <p className="text-gray-400 text-xs">{kConverter(movie.vote_count)} votes</p>
//                 </div>
//               </div>
//               <p className="truncate text-sm mt-1 text-center text-white">{movie.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedMovie && (
//         <div className="mt-8">
//           <h2 className="text-lg font-semibold mb-4">Add Show for: {selectedMovie.title}</h2>

//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <input
//               type="datetime-local"
//               className="border border-gray-300 p-2 rounded-md"
//               value={dateTimeInput}
//               onChange={(e) => setDateTimeInput(e.target.value)}
//             />

//             <input
//               type="number"
//               placeholder="Show Price"
//               className="border border-gray-300 p-2 rounded-md"
//               value={showPrice}
//               onChange={(e) => setShowPrice(e.target.value)}
//             />

//             <button
//               onClick={() => {
//                 if (!dateTimeInput || !showPrice) return;
//                 setDateTimeSelection((prev) => ({
//                   ...prev,
//                   [dateTimeInput]: {
//                     movie: selectedMovie,
//                     showPrice,
//                   },
//                 }));
//                 setDateTimeInput('');
//                 setShowPrice('');
//               }}
//               className="bg-primary text-white px-4 py-2 rounded-md"
//             >
//               Add Show
//             </button>
//           </div>

//           <div className="mt-6">
//             <p className="font-medium text-gray-700 mb-2">Scheduled Shows:</p>
//             <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
//               {Object.entries(dateTimeSelection).map(([datetime, data], i) => (
//                 <li key={i}>
//                   {new Date(datetime).toLocaleString()} — <b>{currency}{data.showPrice}</b>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   ) : null;
// };

// export default AddShows;
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';

import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/Admin/Title';
import { StarIcon, Trash2 } from 'lucide-react';
import { kConverter } from '../../lib/Kconverting';

const currency = import.meta.env.VITE_CURRENCY;

const AddShows = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [showPrice, setShowPrice] = useState('');
  const [dateTimeSelection, setDateTimeSelection] = useState({});

  useEffect(() => {
    setNowPlayingMovies(dummyShowsData);
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setDateTimeInput('');
    setShowPrice('');
    setDateTimeSelection({});
  };

  const handleAddShow = () => {
    if (!dateTimeInput || !showPrice) return;
    const dtKey = new Date(dateTimeInput).toISOString();
    setDateTimeSelection((prev) => ({
      ...prev,
      [dtKey]: {
        movie: selectedMovie,
        showPrice,
      },
    }));
    setDateTimeInput('');
    setShowPrice('');
  };

  const handleDeleteShow = (key) => {
    const copy = { ...dateTimeSelection };
    delete copy[key];
    setDateTimeSelection(copy);
  };

  return nowPlayingMovies.length > 0 ? (
    <div className="p-4 md:p-8">
      <Title text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      <div className="overflow-x-auto pb-4">
        <div className="flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer group hover:-translate-y-1 transition duration-300 ${
                selectedMovie?.id === movie.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSelectMovie(movie)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-60 object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between px-2 py-1 bg-black/70 w-full absolute bottom-0">
                  <div className="flex items-center gap-1 text-gray-200">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <p className="text-gray-400 text-xs">{kConverter(movie.vote_count)} votes</p>
                </div>
              </div>
              <p className="truncate text-sm mt-1 text-center text-white">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Add Show for: {selectedMovie.title}</h2>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Flatpickr
              data-enable-time
              value={dateTimeInput}
              onChange={([date]) => setDateTimeInput(date)}
              options={{
                enableTime: true,
                dateFormat: 'Y-m-d H:i',
                time_24hr: true,
              }}
              className="w-full md:w-60 p-2 rounded-md border border-primary bg-[#1e1e1e] text-white focus:outline-none"
            />

            <input
              type="number"
              placeholder="Show Price"
              className="w-full md:w-40 border border-primary p-2 rounded-md bg-[#1e1e1e] text-white focus:outline-none"
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
            />

            <button
              onClick={handleAddShow}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Add Show
            </button>
          </div>

          <div className="mt-6">
            <p className="font-medium text-white mb-3">Scheduled Shows:</p>
            <ul className="space-y-2">
              {Object.entries(dateTimeSelection).map(([datetime, data], i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-primary/10 p-3 rounded-md border border-primary/20"
                >
                  <span className="text-sm text-gray-200">
                    {new Date(datetime).toLocaleString()} — <b>{currency}{data.showPrice}</b>
                  </span>
                  <button
                    onClick={() => handleDeleteShow(datetime)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default AddShows;
