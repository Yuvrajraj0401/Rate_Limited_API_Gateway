const VALID_API_KEYS = ["123abc", "456def"];

const USER_PLANS = {
  "123abc": "free",
  "456def": "premium",
};

const authMiddleware = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key missing",
      });
    }

    if (!VALID_API_KEYS.includes(apiKey)) {
      return res.status(403).json({
        success: false,
        message: "Invalid API key",
      });
    }

    // ✅ attach user
    req.user = {
      apiKey,
      plan: USER_PLANS[apiKey] || "free",
    };

    next(); // 🔥 VERY IMPORTANT
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;