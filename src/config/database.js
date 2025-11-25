import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const options = {
      // Recommended options for production
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);

    // Log connection state
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    db.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    db.on("reconnected", () => {
      console.log("MongoDB reconnected successfully");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;