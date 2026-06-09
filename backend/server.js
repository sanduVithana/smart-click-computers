// import dotenv from "dotenv";
// import connectDB from "./src/config/db.js";
// import app from "./src/app.js";
// import createAdmin from "./src/utils/createAdmin.js";

// // dotenv.config();

// // connectDB();

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// dotenv.config();

// connectDB().then(async () => {
//   await createAdmin();

//   const PORT = process.env.PORT || 5000;

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

import "dotenv/config";

import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import createAdmin from "./src/utils/createAdmin.js";



const startServer = async () => {
  try {
    await connectDB();

    await createAdmin();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );
    process.exit(1);
  }
};

startServer();