import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/Blurcircle';

const Favorite = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
 
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      <h1 className="text-2xl font-bold mb-4">Your Favorite Movie</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 text-lg">No movies found.</p>
    </div>
  );
};

export default Favorite;
