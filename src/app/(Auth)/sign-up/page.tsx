"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth/auth-client";
import { CheckCircle2 } from "lucide-react"; // Nice success icon
import FormError from "@/src/components/shared/error/FormError";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const router = useRouter();
  const [FError, setFError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/", // Redirecting to Home instead of Login
    });

    if (error) {
      // You can replace this with a small red text under the button later
      setFError(error.message || "Unable to sign Up");
      setLoading(false);
     
    } else {
      setIsSuccess(true);
      // Brief delay so they can read the success message before redirecting
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  }
useEffect(() => {
  if (!FError) return;

  const timer = setTimeout(() => {
    setFError("");
  }, 5000);

  return () => clearTimeout(timer);
}, [FError]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-[#aca6a554] rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
        {isSuccess ? (
          /* SUCCESS STATE: Clean, centered, and professional */
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-500">
            <CheckCircle2 size={64} className="text-[#006b5b] mb-4" />
            <h2 className="text-2xl font-bold text-[#006b5b] mb-2">
              Welcome to Nexora!
            </h2>
            <p className="text-sm text-black/60">
              Your account has been created successfully. <br />
              Taking you to the home page...
            </p>
          </div>
        ) : (
          /* FORM STATE */
          <>
            <h2 className="text-2xl font-semibold text-[#006b5b] mb-1">
              Create Account
            </h2>
            <h3 className="text-sm font-normal text-black/50 mb-6">
              Join Nexora today
            </h3>
            <FormError FError={FError} setFError={""}  />
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="w-full h-10 px-3 rounded border-none focus:ring-2 focus:ring-[#ff4c00] outline-none"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full h-10 px-3 rounded border-none focus:ring-2 focus:ring-[#ff4c00] outline-none"
                  type="email"
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
                  placeholder="Create a password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-[#ff4c00] via-[#006b5b] to-[#ff4c00] text-white font-semibold rounded transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <hr className="my-6 border-gray-300" />

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#006b5b] hover:underline"
              >
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
