// fucntion to check availabilty of selected seats for movie 

import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    // Check if any selected seat is already occupied
    const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// 
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth(); // assuming you're using Clerk or custom auth middleware
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // 1. Check seat availability
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available.",
      });
    }

    // 2. Get show details
    const showData = await Show.findById(showId).populate("movie");
 

    // 3. Create booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats
    });

    // 4. Mark selected seats as occupied
    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    // 5. Respond
    res.json({
      success: true,
      message: "Booked successfully",
      booking,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const showData = await Show.findById(showId)

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({
      success: true,
      occupiedSeats,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

