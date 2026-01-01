const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Coaching Institute Backend Running");
});

// contact form API
app.post("/enquiry", async (req, res) => {
  const { name, phone, course } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // mail setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // mail content
    const mailOptions = {
      from: `"Coaching Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Student Enquiry",
      html: `
        <h3>New Enquiry Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Course:</b> ${course}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Enquiry sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed" });
  }
});


