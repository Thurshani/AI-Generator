import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currentState === "Sign up") {
      if (!isDataSubmitted) {
        // Step 1: Proceed to Step 2 (Bio)
        setIsDataSubmitted(true);
      } else {
        // Step 2: Final Submission
        console.log("Sign up Data:", { fullName, email, password, bio });
        alert("Account created successfully!");
        // Reset form (optional)
        setFullName("");
        setEmail("");
        setPassword("");
        setBio("");
        setIsDataSubmitted(false);
      }
    } else {
      // Login
      console.log("Login Data:", { email, password });
      alert("Login submitted!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap sm:justify-evenly max-sm:flex-col backdrop-blur-2xl p-50">
      {/* Left Side */}
      <img src={assets.logo_big} alt="logo" className="w-[100px] sm:w-[160px]" />

      {/* Right Side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-[350px]  bg-white/10 backdrop-blur-md text-white border border-gray-500 p-5 flex flex-col gap-4 rounded-lg shadow-2xl"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && currentState === "Sign up" && (
            <img
              src={assets.arrow_icon}
              alt="back"
              className="w-5 cursor-pointer"
              onClick={() => setIsDataSubmitted(false)}
            />
          )}
        </h2>

        {/* Step 1: Full Name, Email, Password */}
        {currentState === "Sign up" && !isDataSubmitted && (
          <>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
              className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </>
        )}

        {/* Step 2: Bio */}
        {currentState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Provide a short bio..."
            required
            className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        )}

        {/* Login Fields */}
        {currentState === "Login" && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          {currentState === "Sign up"
            ? isDataSubmitted
              ? "Finish Sign Up"
              : "Create Account"
            : "Login Now"}
        </button>

        {/* Terms */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" className="accent-violet-500" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        {/* Switch State */}
        <div className="flex flex-col gap-2">
          {currentState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer ml-2"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrentState("Sign up");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer ml-2"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
