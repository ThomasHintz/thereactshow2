const rateLimitWindow = 60 * 1000; // 1 minute
const maxRequests = 8; // Maximum number of requests within the rateLimitWindow
const rateLimiter = new Map();

const isRateLimited = (ip) => {
  const currentTime = Date.now();
  const record = rateLimiter.get(ip);

  if (record) {
    const [requestCount, windowStart] = record;

    if (currentTime - windowStart < rateLimitWindow) {
      if (requestCount > maxRequests) {
        return true;
      }
      rateLimiter.set(ip, [requestCount + 1, windowStart]);
    } else {
      rateLimiter.set(ip, [1, currentTime]);
    }
  } else {
    rateLimiter.set(ip, [1, currentTime]);
  }

  return false;
};

const withRateLimiter = (handler, redirect) => async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (isRateLimited(ip)) {
    if (redirect) {
      res.redirect(`/rate-limited`);
    } else {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    return;
  }

  await handler(req, res);
};

module.exports = {
  withRateLimiter,
};
