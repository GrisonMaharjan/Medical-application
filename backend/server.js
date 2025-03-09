require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const User = require("./models/User");
const Appointment = require("./models/Appointment");
const userRoutes = require ("./routes/users"); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Secret Key for JWT
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// 🔹 Register User Route
app.post("/register", async (req, res) => {
  try {
    const {
      firstName, lastName, username, email, phoneNumber, dateOfBirth, gender,
      address, city, state, knownAllergies, currentMedication,
      medicalConditions, emergencyContactName, emergencyContactNumber,
      password, confirmPassword, agreeTos, agreePrivacy
    } = req.body;

    if (!agreeTos || !agreePrivacy) {
      return res.status(400).json({ message: "You must agree to Terms and Privacy Policy." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName, lastName, email, phoneNumber, dateOfBirth, gender,
      address, city, state, knownAllergies, currentMedication,
      medicalConditions, emergencyContactName, emergencyContactNumber,
      password: hashedPassword, agreeTos, agreePrivacy
    });

    await newUser.save();
    res.json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// 🔹 Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful!", token, role: user.role });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// 🔹 Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized!" });

    req.user = decoded;
    next();
  });
};

// 🔹 PROTECTED DASHBOARD ROUTE
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// 🔹 Get all users (for testing)
app.get('/getUsers', (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// =========================================
// 🚀 APPOINTMENT BOOKING SYSTEM
// =========================================

app.post("/book-appointment", async (req, res) => {
  try {
    const { patientId, doctorId, appointmentType, date, time } = req.body;

    if (!patientId || !doctorId || !appointmentType || !date || !time) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      appointmentType,
      date,
      time,
    });

    await newAppointment.save();

    // Notify doctor (For now, this just logs the notification)
    console.log(`📢 Doctor ${doctorId} has a new appointment!`);

    res.status(200).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error while booking appointment" });
  }
});

// ✅ Real-time Notifications with Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newAppointment", (appointment) => {
    io.emit(`notifyDoctor_${appointment.doctorId}`, appointment);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 🔹 Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Getting appointment details 
app.get("/api/appointments", async (req, res) => {
  try {
    const { patientId } = req.query;
    if (!patientId) {
      return res.status(400).json({ error: "Missing patientId" });
    }

    const appointments = await Appointment.find({ patientId }).sort({ date: 1 }).limit(1);

    if (!appointments.length) {
      return res.status(404).json({ error: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

app.use("/api/users", userRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
