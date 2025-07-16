// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { dummyShowsData, dummyDateTimeData } from '../assets/assets';
// import BlurCircle from '../components/Blurcircle';
// import { StarIcon, PlayCircleIcon, Heart } from 'lucide-react';
// import timeFormat from '../lib/timeformat';
// import DateSelect from '../components/DateSelect';

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [show, setShow] = useState(null);

//   useEffect(() => {
//     const getShow = async () => {
//       console.log('Looking for movie with ID:', id);

//       const foundShow = dummyShowsData.find(
//         (show) => String(show.id) === String(id)
//       );

//       if (foundShow) {
//         setShow({
//           movie: foundShow,
//           dateTime: dummyDateTimeData,
//         });
//       } else {
//         console.warn('Movie not found for ID:', id);
//       }
//     };

//     getShow();
//   }, [id]);

//   if (!show) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-400 text-lg">Loading movie details...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="px-6 md:px-16 lg:px-40 pt-20 md:pt-32 relative">
//         <img
//           src={show.movie.poster_path}
//           alt={show.movie.title}
//           className="max-md:mx-auto rounded-xl h-96 max-w-70 object-cover"
//         />

//         <div className="relative z-10 mt-6">
//           <BlurCircle top="-100px" left="-100px" />

//           <p className="text-primary uppercase">English</p>

//           <h1 className="text-3xl font-bold mb-4">{show.movie.title}</h1>

//           <div className="flex items-center gap-2">
//             <StarIcon className="w-5 h-5 text-primary fill-primary" />
//             <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
//           </div>

//           <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
//             {show.movie.overview}
//           </p>

//           <p className="mt-2 text-sm text-gray-300">
//             {timeFormat(show.movie.runtime)} &bull;{" "}
//             {show.movie.genres.map((genre) => genre.name).join(", ")} &bull;{" "}
//             {show.movie.release_date.split("-")[0]}
//           </p>

//           {/* Buttons */}
//           <div className="flex items-center flex-wrap gap-4 mt-4">
//             <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
//               <PlayCircleIcon className="w-5 h-5" />
//               Watch Trailer
//             </button>

//             <a
//               href="#dateselect"
//               className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95 text-white"
//             >
//               Buy Tickets
//             </a>

//             <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
//               <Heart className="w-5 h-5 text-white" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Cast Section */}
//       <p className="text-lg font-medium mt-20 px-6 md:px-16 lg:px-40">Your Favorite Cast</p>

//       <div className="overflow-x-auto no-scrollbar mt-8 pb-4 px-6 md:px-16 lg:px-40">
//         <div className="flex items-center gap-4 w-max">
//           {show.movie.casts.slice(0, 12).map((cast, index) => (
//             <div key={index} className="flex flex-col items-center text-center">
//               <img
//                 src={cast.profile_path}
//                 alt={cast.name}
//                 className="rounded-full h-20 md:h-20 aspect-square object-cover"
//               />
//               <p className="mt-2 text-sm">{cast.name}</p>
//             </div>
//           ))}
//         </div>
//         <DateSelect dateTime={show.dateTime} id={id} />
//       </div>
//     </>
//   );
// };

// export default MovieDetails;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyShowsData, dummyDateTimeData } from '../assets/assets';
import BlurCircle from '../components/Blurcircle';
import { StarIcon, PlayCircleIcon, Heart } from 'lucide-react';
import timeFormat from '../lib/timeformat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard'; // ✅ Ensure this import is present

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const getShow = async () => {
      const foundShow = dummyShowsData.find(
        (show) => String(show.id) === String(id)
        
      );
      if (foundShow) {
        setShow({
          movie: foundShow,
          dateTime: dummyDateTimeData,
        });
      }
    };
    getShow();
  }, [id]);

  const handleScrollToDate = () => {
    const section = document.getElementById('dateSelect');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!show) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">Loading movie details...</p>
      </div>
    );
  }

  return (
    <>
      {/* Movie Poster & Info */}
      <div className="px-6 md:px-16 lg:px-40 pt-20 md:pt-32 relative">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-96 max-w-70 object-cover"
        />

        <div className="relative z-10 mt-6">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary uppercase">English</p>
          <h1 className="text-3xl font-bold mb-4">{show.movie.title}</h1>

          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          <p className="mt-2 text-sm text-gray-300">
            {timeFormat(show.movie.runtime)} &bull;{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} &bull;{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <button
              onClick={handleScrollToDate}
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95 text-white"
            >
              Buy Tickets
            </button>

            <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-20 px-6 md:px-16 lg:px-40">
        <p className="text-lg font-medium">Your Favorite Cast</p>

        <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
          <div className="flex items-center gap-4 w-max">
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="rounded-full h-20 md:h-20 aspect-square object-cover"
                />
                <p className="mt-2 text-sm">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Select Section + Recommendations */}
      <div className="px-6 md:px-16 lg:px-40 mt-12">
        <DateSelect dateTime={show.dateTime} id={id} />

        <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>

        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <button
            onClick={() => {
              navigate('/movies');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
            Show More
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
