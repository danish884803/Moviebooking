import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    const user = await clerkClient.users.getUser(userId);

    if (user.privateMetadata.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
};

