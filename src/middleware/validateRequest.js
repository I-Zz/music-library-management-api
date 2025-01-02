const { validationResult } = require("express-validator");

exports.validate = (schema) => async (req, res, next) => {
  await Promise.all(schema.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({
    //     message: 'Validation error',
    //     errors: errors.array(),
    // });
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
  next();
};

// exports.validateHeader = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(400).json({
//       status: 400,
//       data: null,
//       message: "Bad Request",
//       error: null,
//     });
//   }
//   next();
// };

exports.validateAuth = (schema) => async (req, res, next) => {
  await Promise.all(schema.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const missingField = errors.array()[0]?.msg || "Invalid input";
    // return res.status(400).json({
    //     message: 'Validation error',
    //     errors: errors.array(),
    // });
    return res.status(400).json({
      status: 400,
      data: null,
      message: `Bad Request, Reason: ${missingField}`,
      error: null,
    });
  }
  next();
};
