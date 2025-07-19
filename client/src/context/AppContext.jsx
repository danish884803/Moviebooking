// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { data, useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// axios.defaults.baseURL= import.meta.env.VITE_BASE_URL

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {

//     const [isAdmin,setIsAdmin]=useState(false)
//     const [shows,setshows]=useState([])
//     const [favoriteMovies,setfavoriteMovies]=useState([])

//     const {user} =useUser()
//     const {getToken}=useAuth()
//     const location =useLocation()
//     const navigate=useNavigate()
    
// const fetchAdmin = async () => {
//   try {
//     const { data } = await axios.get('/api/admin/is-admin', {
//       headers: {
//         Authorization: `Bearer ${await getToken()} `}})
//         setIsAdmin(data.isAdmin)

//         if(!data.isAdmin && location.pathname.startsWith('/admin')){
//             navigate('/')
//             toast.error('you are not authorized')
//         }
//   } catch (error) {
//     console.error("Admin check failed:", error.message);
//   }
// }

// const fetchShows=async ()=>{
//     try {
//         const {data} = await axios.get('/api/shows/all')
//         if(data.success){
//             setshows(data.shows)
//         }else{
//             toast.error(data.message)
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }

// const fetchFavoriteMovies = async () => {
//   try {
//     const { data } = await axios.get('/api/user/favorites', {
//       headers: {
//         Authorization: `Bearer ${await getToken()}`
//       }
//     })

//     if (data.success) {
//       setFavoriteMovies(data.movies);
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error("Failed to fetch favorites:", error.message);
//     toast.error("Something went wrong while fetching favorites.");
//   }
// };


// useEffect(()=>{
//     fetchShows()
// },[])

// useEffect(()=>{
//     if(user){
//         fetchAdmin()
//         fetchFavoriteMovies()
//     }
// },[user])
    


//   const value = {axios,
//     fetchAdmin,
//     user,getToken,navigate ,isAdmin,shows,favoriteMovies,fetchFavoriteMovies
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/shows/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error.message);
      toast.error("Something went wrong while fetching favorites.");
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies();
    }
  }, [user]);

  const value = {
    axios,
    user,
    getToken,
    navigate,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
