const validateAdmin = (req, _res, next) => {
    const { admin } = req.query;
    if (admin === "true") {
      next();
    } else {
      next("You do not have access to that route.");
    }
  }
  
  module.exports = validateAdmin;