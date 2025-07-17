import { Inngest } from "inngest";
import connectDB from "../configs/db.js"; // ✅ adjust path as needed
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// save user data to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB(); // ✅ ensure MongoDB is connected
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses?.[0]?.email_address,
        name: first_name + " " + last_name,
        image: image_url,
      };
      await User.create(userData);
    } catch (err) {
      console.error("Error syncing user creation:", err.message);
      throw err;
    }
  }
);

// delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();
      const { id } = event.data;
      await User.findByIdAndDelete(id);
    } catch (err) {
      console.error("Error syncing user deletion:", err.message);
      throw err;
    }
  }
);

// update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      await connectDB();
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        email: email_addresses?.[0]?.email_address,
        name: first_name + " " + last_name,
        image: image_url,
      };
      await User.findByIdAndUpdate(id, userData);
    } catch (err) {
      console.error("Error syncing user update:", err.message);
      throw err;
    }
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
