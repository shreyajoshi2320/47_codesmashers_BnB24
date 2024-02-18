// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const appointmentRouter = require('./routes/appointment-routes');
const adminRouter = require('./routes/admin-routes');
const doctorRouter = require('./routes/doctor-routes');
const patientRouter = require('./routes/patient-routes');
const patient2Router = require('./routes/patient2-routes');

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/patient2', patient2Router);
app.use('/appointments', appointmentRouter);

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
