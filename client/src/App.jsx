import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBooking from './pages/MyBooking';
import Favourite from './pages/Favourite';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Dashboard from './pages/Admin/Dashboard';
import Addshows from './pages/Admin/Addshows';
import Listshows from './pages/Admin/Listshows';
import Listbooking from './pages/Admin/Listbooking';
import Layout from './pages/Admin/Layout';

const App = () => {
  // ✅ Fixed from './admin' to '/admin'
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <div>
      {/* Global toaster notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Show Navbar only if not in /admin route */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBooking />} />
        <Route path='/favorite' element={<Favourite />} />
        <Route path='/admin/*' element={<Layout/>} />
        {/* <Route index  element={Dashboard}/> */}
        <Route path="add-shows" element={<Addshows/>}/>
        <Route path="list-shows" element={<Listshows/>}/>
        <Route path="list-bookings" element={<Listbooking/>}/>

      </Routes>

      {/* Show Footer only if not in /admin route */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route,Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import SeatLayout from './pages/SeatLayout'
// import MyBooking from './pages/MyBooking'
// import Favourite from './pages/Favourite'
// import {Toaster} from 'react-hot-toast'
// import Footer from './components/Footer'
// const App = () => {
//   const isAdminRoute=useLocation().pathname.startsWith('./admin')
//   return (
//     <div>
//       {!isAdminRoute && <Navbar/>}
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/movies' element={<Movies/>}/>
//         <Route path='/movies/:id' element={<MovieDetails/>}/>
//         <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
//         <Route path='/my-bookings' element={<MyBooking/>}/>
//         <Route path='/favorite' element={<Favourite/>}/>

//       </Routes>
//             {!isAdminRoute && <Footer/>}

//     </div>
//   )
// }

// export default App