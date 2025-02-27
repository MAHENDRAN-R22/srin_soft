const cluster = require("cluster");
const os = require("os");
const express = require("express");
const numCPUs = os.cpus().length;
const errorHandler = require('./middleware/errorhandler');
const cors = require('cors');
const pool = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');

require("dotenv").config();



// if (cluster.isMaster) {
//   console.log(`Master process ${process.pid} is running`);
//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker) => {
//     console.log(`Worker ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } 

const app = express();
app.use(express.json());
app.use(cors());


// Testing POSTGRES Connection
app.get("/", async (req, res) => {
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("result", result.rows);
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

//   app.get("/", (req, res) => {
//     res.send('Welcome to the library);
//   });

//middleware routes
app.use("/library", userRoutes);

//middleware error handler
app.use(errorHandler);


//function to test database connection
const testDBConnection = async () => {
try {
    const client = await pool.connect();
    console.log("PostgreSQL connected successfully!");
} catch (error) {
    console.error("PostgreSQL connection error:", error);
}
};
testDBConnection();
  
app.listen(process.env.PORT || 3000, () => {
console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
