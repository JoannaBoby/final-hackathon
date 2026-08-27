import { useState } from "react";
import "./App.css";

import registerImage from "./assets/register.jpg";
import loginImage from "./assets/login.jpg";
import bookingImage from "./assets/booking.jpg";
import successImage from "./assets/success.jpg";
import myBookingsImage from "./assets/mybookings.jpg";

function App() {
  const [page, setPage] = useState("register");

  // REGISTER
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // RESET PASSWORD
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // BOOKING
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  const [bookings, setBookings] = useState([]);

  // =========================
  // REGISTER
  // =========================

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    const existingUser = localStorage.getItem("registeredUser");

    if (existingUser) {
      alert("An account is already registered. Please login.");
      setPage("login");
      return;
    }

    const user = {
      username: username,
      password: password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registration successful! 🎉");

    setLoginUsername(username);
    setLoginPassword("");

    setPage("login");
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      alert("No account found. Please register first.");
      setPage("register");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      loginUsername === user.username &&
      loginPassword === user.password
    ) {
      alert("Login successful! 🎉");
      setPage("booking");
    } else {
      alert("❌ Username or password is incorrect.");
    }
  };

  // =========================
  // RESET PASSWORD
  // =========================

  const handleResetPassword = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      alert("No account found. Please register first.");
      setPage("register");
      return;
    }

    const user = JSON.parse(savedUser);

    if (resetUsername !== user.username) {
      alert("❌ Username not found.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      alert("Please enter your new password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    const updatedUser = {
      username: user.username,
      password: newPassword,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    alert("Password reset successfully! 🎉");

    setLoginUsername(user.username);
    setLoginPassword("");

    setResetUsername("");
    setNewPassword("");
    setConfirmPassword("");

    setPage("login");
  };

  // =========================
  // BOOKING
  // =========================

  const handleBooking = (e) => {
    e.preventDefault();

    if (!date || !time || !people) {
      alert("Please fill in all booking details.");
      return;
    }

    const newBooking = {
      date: date,
      time: time,
      people: people,
    };

    const updatedBookings = [...bookings, newBooking];

    setBookings(updatedBookings);

    setPage("success");
  };

  return (
    <div className="app">

      {/* ================= REGISTER ================= */}

      {page === "register" && (
        <div className="card">

         <img
  src={registerImage}
  alt="Creative workshop"
  className="page-image"
  style={{
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
/>

          <h1>Create Account</h1>

          <p className="subtitle">
            Register to start your creative journey ✨
          </p>

          <form onSubmit={handleRegister}>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="password-info">
              Password must contain at least 6 characters.
            </p>

            <button type="submit">
              Register
            </button>

          </form>

          <button
            className="secondary-button"
            onClick={() => setPage("login")}
          >
            Already have an account? Login
          </button>

        </div>
      )}

      {/* ================= LOGIN ================= */}

      {page === "login" && (
        <div className="card">

          <img
  src={loginImage}
  alt="Creative experience"
  className="page-image"
  style={{
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
/>

          <h1>Welcome Back 💜</h1>

          <p className="subtitle">
            Login to continue your creative experience
          </p>

          <form onSubmit={handleLogin}>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button type="submit">
              Login
            </button>

          </form>

          <button
            className="forgot-button"
            onClick={() => setPage("reset")}
          >
            Forgot Password?
          </button>

          <button
            className="secondary-button"
            onClick={() => setPage("register")}
          >
            Create New Account
          </button>

        </div>
      )}

      {/* ================= RESET PASSWORD ================= */}

      {page === "reset" && (
        <div className="card">

          <img
  src={loginImage}
  alt="Creative experience"
  className="page-image"
  style={{
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
/>

          <h1>Reset Password 🔐</h1>

          <p className="subtitle">
            Create a new password for your account
          </p>

          <form onSubmit={handleResetPassword}>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={resetUsername}
              onChange={(e) => setResetUsername(e.target.value)}
            />

            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm New Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">
              Reset Password
            </button>

          </form>

          <button
            className="secondary-button"
            onClick={() => setPage("login")}
          >
            Back to Login
          </button>

        </div>
      )}

      {/* ================= BOOKING ================= */}

      {page === "booking" && (
        <div className="card">

         <img
  src={bookingImage}
  alt="Creative workshop"
  className="page-image"
  style={{
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
/>

          <h1>Book a Workshop 🎨</h1>

          <p className="subtitle">
            Choose your preferred date and time
          </p>

          <form onSubmit={handleBooking}>

            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time</label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <label>Number of People</label>

            <input
              type="number"
              min="1"
              max="20"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />

            <button type="submit">
              Confirm Booking ✨
            </button>

          </form>

          <button
            className="secondary-button"
            onClick={() => setPage("mybookings")}
          >
            My Bookings 📅
          </button>

          <button
            className="secondary-button logout-button"
            onClick={() => setPage("login")}
          >
            Logout
          </button>

        </div>
      )}

      {/* ================= SUCCESS ================= */}

      {page === "success" && (
        <div className="card success-card">

          <img
  src={successImage}
  alt="Booking successful"
  className="page-image"
  style={{
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
/>
          <h1>Booking Successful! 🎉</h1>

          <p>
            Your creative experience has been booked successfully.
          </p>

          <div className="booking-details">

            <p>
              <strong>Date:</strong> {date}
            </p>

            <p>
              <strong>Time:</strong> {time}
            </p>

            <p>
              <strong>People:</strong> {people}
            </p>

          </div>

          <button
            onClick={() => setPage("mybookings")}
          >
            View My Bookings 📅
          </button>

          <button
            className="secondary-button"
            onClick={() => setPage("booking")}
          >
            Book Another Experience
          </button>

        </div>
      )}

      {/* ================= MY BOOKINGS ================= */}

      {page === "mybookings" && (
        <div className="card">

         <img
  src={myBookingsImage}
  alt="My bookings"
  className="page-image"
  style={{
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
  }}
/>
          <h1>My Bookings 📅</h1>

          <p className="subtitle">
            Your booked creative experiences
          </p>

          {bookings.length === 0 ? (

            <div className="booking-details empty-bookings">

              <p>
                You don't have any bookings yet.
              </p>

            </div>

          ) : (

            bookings.map((booking, index) => (

              <div
                className="booking-details"
                key={index}
              >

                <p>
                  <strong>🎨 Experience:</strong> Creative Workshop
                </p>

                <p>
                  <strong>📅 Date:</strong> {booking.date}
                </p>

                <p>
                  <strong>⏰ Time:</strong> {booking.time}
                </p>

                <p>
                  <strong>👥 People:</strong> {booking.people}
                </p>

                <p className="confirmed">
                  ✓ Confirmed
                </p>

              </div>

            ))

          )}

          <button
            onClick={() => setPage("booking")}
          >
            Book Another Experience
          </button>

          <button
            className="secondary-button logout-button"
            onClick={() => setPage("login")}
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default App;