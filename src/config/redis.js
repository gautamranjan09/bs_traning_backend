import dotenv from "dotenv";
dotenv.config();

import Redis from "ioredis";

/**
 * Initialize Upstash Redis client
 */

const redis = new Redis("rediss://default:ATRQAAIncDJlZjM0Yjg2NWYwNzA0ODBlOGI5MWU5YjI4NDE3NzhjMHAyMTMzOTI@useful-lionfish-13392.upstash.io:6379");

/**
 * Test Redis connection
 * @returns {Promise<void>}
 */
export const testRedisConnection = async () => {
  try {
    const testKey = "connection_test";
    const testValue = new Date().toISOString();

    // Set test key with 10 second expiration
    await redis.set(testKey, testValue, "ex", 60);

    // Get the test key
    const result = await redis.get(testKey);

    // Both values should be strings, so direct comparison should work
    if (result !== testValue) {
      console.error("Redis test failed - Expected:", testValue, "Got:", result);
      throw new Error("Redis read/write test failed");
    }

    // Delete test key
    // await redis.del(testKey);

    console.log("✓ Redis connected successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error.message);
    throw error;
  }
};

export default redis;
