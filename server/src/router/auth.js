const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();
const { json } = express();
const Admin = require("../models/admin");
const Patient = require("../models/patient");
router.get("/hello", (req, res) => {
  res.send("Hello Server");
});
router.post("/registerAdmin", async (req, res) => {
  try {
    const { name, email, phone, password, cPassword, pin } = req.body;
    if (!name || !email || !phone || !password || !cPassword || !pin) {
      res.json({ message: "error", type: "uncompleted details" });
    }
    const confirm = await Admin.findOne({ email });
    if (confirm) {
      res.json({ message: "error", type: "data already exist" });
    } else {
      if (password === cPassword) {
        const admin = await new Admin({
          name,
          email,
          phone,
          password,
          cPassword,
          pin,
        });
        if (admin) {
          const data = await admin.save();
          res
            .status(200)
            .json({ message: "done", type: "successfully registration" });
        } else {
          res
            .status(401)
            .json({ message: "error", type: "error in storing data" });
        }
      } else {
        res.json({ message: "error", type: "password not matching" });
      }
    }
  } catch (e) {
    res.json({ message: "error", type: "unknown error" });
  }
});
// Patient
router.post("/registerPatient", async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;
    if (!name || !email || !password || !cPassword) {
      res.json({ message: "error", type: "uncompleted details" });
    }
    const confirm = await Patient.findOne({ email });
    console.log("This is confirm ", confirm);
    if (confirm) {
      res.json({ message: "error", type: "data already exist" });
    } else {
      if (password === cPassword) {
        const patient = await new Patient({
          name,
          email,
          password,
          cPassword,
        });

        if (patient) {
          console.log("This is data ");
          const data = await patient.save();

          res
            .status(200)
            .json({ message: "done", type: "successfully registration" });
        } else {
          res
            .status(401)
            .json({ message: "error", type: "error in storing data" });
        }
      } else {
        res.json({ message: "error", type: "password not matching" });
      }
    }
  } catch (e) {
    res.json({ message: "error", type: "unknown error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "error" });
    }
    const patient = await Patient.findOne({ email });
    if (patient) {
      const matchPassword = await bcrypt.compare(password, patient.password);
      const token = await patient.generateAuthToken();

      if (matchPassword) {
        res
          .cookie("jwToken", token, {
            key: "admin",
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          })
          .status(200)
          .json({ message: "done", token: token, mode: "Patient" });
      } else {
        return res.status(400).json({ message: "error" });
      }
    } else {
      const admin = await Admin.findOne({ email });

      if (admin) {
        const matchPassword = await bcrypt.compare(password, admin.password);
        const token = await admin.generateAuthToken();

        if (matchPassword) {
          res
            .cookie("jwToken", token, {
              key: "admin",
              maxAge: 2 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "strict",
              secure: true,
            })
            .status(200)
            .json({ message: "done", token: token, mode: "Admin" });
        } else {
          return res.status(400).json({ message: "error" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "error", type: "patient not found" });
      }
    }
  } catch (e) {
    return res.json({ message: "error", type: "unknown error" });
  }
});
module.exports = router;
