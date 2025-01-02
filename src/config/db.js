const mongoose = require("mongoose");

const connect = async () => {
  try {
    // await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connect(process.env.DB_URI);
    // await mongoose.connect(process.env.DB_URI, {
    //   ssl: true,
    //   //   sslValidate: true,
    //   //   tlsAllowInvalidCertificates: false,
    //   //   tlsInsecure: false,
    // });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
};

module.exports = { connect };
