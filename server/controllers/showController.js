import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

// GET /api/show/now-playing
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        },
        timeout: 5000 // 5 seconds timeout
      }
    );

    const movies = data.results;
    res.json({ success: true, movies });
  } catch (error) {
    console.error("Now Playing Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/show/add
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      // Fetch movie details
      const movieDetailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
          },
          timeout: 5000
        }
      );

      let movieCreditsResponse;

      try {
        movieCreditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            },
            timeout: 5000
          }
        );
      } catch (creditError) {
        console.warn(`Warning: Failed to fetch credits for movie ${movieId}: ${creditError.message}`);
        movieCreditsResponse = { data: { cast: [] } }; // Fallback
      }

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        genres: movieApiData.genres,
        casts: movieCreditsData.cast.slice(0, 10), // Optional: limit cast
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime
      };

      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];

    showsInput.forEach(show => {
      const showDate = show.date;
      show.time.forEach(time => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {}
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Show(s) added successfully." });
  } catch (error) {
    console.error("Add Show Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Api to get all shows from the database
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({showDateTime: { $gte: new Date() } }).populate("movie").sort({ showDateTime: 1 });

    // Filter unique shows based on movie ID
    const uniqueShows = new Set(shows.map(show => show.movie))
    res.json({ success: true, shows: Array.from(uniqueShows) })
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// Api to get a single show from database
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    // ✅ Use movieId here, not movield
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() }
    }).sort({ showDateTime: 1 });

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    const dateTime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id,
      });
    });

    res.json({
      success: true,
      movie,
      dateTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     // Find the movie
//     const shows = await Show.find({movie: movield, showDateTime: { $gte: new
//     Date() } } )

//     const movie = await Movie.findById(movieId);
//         const dateTime = {};

//     shows.forEach((show) => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) {
//         dateTime[date] = [];
//       }
//       dateTime[date].push({
//         time: show.showDateTime,
//         showId: show._id,
//       });
//     });

//     res.json({
//       success: true,
//       movie,
//       dateTime,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };





