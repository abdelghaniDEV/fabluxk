
const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // حفظ بيانات المستخدم في الطلب
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };
  
  module.exports = authenticateToken;
  