const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // التأكد من وجود الهيدر والتوكن
  if (!req.headers?.authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'No token provided, authorization denied' 
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    // فك تشفير التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // التعديل الجوهري هنا:
    // التوكن الخاص بك يحتوي على "userId" وليس "id"
    req.user = {
      id: decoded.userId || decoded.id
    };

    console.log("✅ Auth Middleware: User ID extracted:", req.user.id);
    next();

  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    return res.status(401).json({ 
      message: 'Token is not valid' 
    });
  }
};

module.exports = auth;
