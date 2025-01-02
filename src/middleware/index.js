// const authMiddleware = require('./authMiddleware');
// const errorHandler = require('./errorHandler');
// const validateRequest = require('./validateRequest');

// module.exports = {
//     authMiddleware,
//     errorHandler,
//     validateRequest,
// };

const { authenticate, authorize } = require("./authMiddleware");
const { errorHandler } = require("./errorHandler");
const { validate, validateAuth } = require("./validateRequest");

module.exports = {
  authenticate,
  authorize,
  errorHandler,
  validate,
  validateAuth,
};
