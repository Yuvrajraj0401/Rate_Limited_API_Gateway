const redis = require("../config/redis");

const WINDOW_SIZE = 120; // seconds

const PLAN_LIMITS = {
  free: 5,
  premium: 20,
};

const rateLimiter = async (req, res, next) => {
  try {
    const { apiKey, plan } = req.user;

    const key = `rate:${apiKey}`;
    const currentRequests = await redis.incr(key);

    // ✅ set expiry only once
    if (currentRequests === 1) {
      await redis.expire(key, WINDOW_SIZE);
    }

    const maxRequests = PLAN_LIMITS[plan] || 5;

    // ✅ Debug logs (NOW correct)
    console.log("API KEY:", apiKey);
    console.log("Redis KEY:", key);
    console.log("Count:", currentRequests);

    // ✅ Headers
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(maxRequests - currentRequests, 0)
    );

    // ✅ Blocking logic
    if (currentRequests > maxRequests) {
      console.log("🚫 BLOCKED");
      return res.status(429).json({
        success: false,
        message: `Rate limit exceeded for ${plan} user 🚫`,
      });
    }
    console.log("🔥 RATE LIMITER ACTIVE");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = rateLimiter;