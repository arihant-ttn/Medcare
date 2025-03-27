"use client"
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

function CheckAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      //  Show error toast and redirect if no token
      toast.error("User not logged in! Redirecting to login...");
      setTimeout(() => {
        router.push("/login"); // Redirect to login page after 1.5 seconds
      }, 1500);
    } else {
      setLoggedIn(true);
    }
  }, [router]);

  if (!loggedIn) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={2000} />
        {/* Waiting for redirect, no need to render content */}
      </>
    );
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* <h1 className="text-green-600 font-semibold">✅ User is logged in!</h1> */}
    </div>
  );
}

export default CheckAuth;
