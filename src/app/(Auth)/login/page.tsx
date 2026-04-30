"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/src/lib/auth/auth-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error) {
      // Better-Auth provides clear messages like "Invalid email or password"
      alert(error.message || "Failed to login");
    } else {
      // On success, Better-Auth handles the redirect to callbackURL automatically
      console.log("Logged in successfully:", data);
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-[#aca6a554] rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h2 className="text-2xl font-semibold text-[#006b5b] mb-1">
          Welcome Back
        </h2>
        <h3 className="text-sm font-normal text-black/50 mb-6">
          Login to your Nexora account
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full h-10 px-3 rounded border-none focus:ring-2 focus:ring-[#ff4c00] outline-none"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full h-10 px-3 rounded border-none focus:ring-2 focus:ring-[#ff4c00] outline-none"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2 px-4 bg-gradient-to-r from-[#ff4c00] via-[#006b5b] to-[#ff4c00] text-white font-semibold rounded transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#006b5b] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
