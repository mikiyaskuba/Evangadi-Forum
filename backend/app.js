const express = require("express");
const app = express();
const port = 5500; // Original port number

// Import routes
const userRoute = require("./routes/userRoute");
const questionsRouter = require("./routes/questionRoute");
const answersRouter = require("./routes/answerRoute");

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/users", userRoute);
app.use("/api/questions", questionsRouter);
app.use("/api/answers", answersRouter);

// Start server
const dbConnection = require("./db/config");

async function start() {
  try {
    await dbConnection.execute("SELECT 'test'");
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Please choose a different port.`
      );
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
}

start();
