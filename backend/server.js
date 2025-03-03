require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ Log to check if .env file is loaded
console.log("MongoDB URI:", process.env.MONGO_URI);

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Connection Error:", err);
});

// 🔹 Secret Key for JWT
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

    // ✅ Check for missing required fields
    if (!agreeTos || !agreePrivacy) {
      return res.status(400).json({ message: "You must agree to Terms and Privacy Policy." });
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // ✅ Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // ✅ Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Save user to database
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
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     // ✅ Generate JWT Token
//     const token = jwt.sign({ userId: user._id}, SECRET_KEY, { expiresIn: "1h" });

//     res.json({ message: "Login successful!", token });

//   } catch (error) {
//     console.error("Error in /login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful!", token, role: user.role });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});



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
  res.json({ user: req.user }); // Send user details
});

// 🔹 Protected Dashboard Route
// app.get("/login", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer "
//   if (!token) return res.status(401).json({ message: "Unauthorized!" });

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     res.json({ message: "Welcome to the Dashboard!", userId: decoded.userId });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token!" });
//   }
// });

// 🔹 Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
