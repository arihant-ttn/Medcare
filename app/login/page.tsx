"use client"; // If using Next.js App Router
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../components/styles/login.module.css";
import { useSearchParams } from "next/navigation";
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Initialize router for redirect
  const router = useRouter();
  const admin = "admin@gmail.com";
  const adminPassword = "123123";
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if(formData.email===admin && formData.password === adminPassword){
      console.log("HEllo")
      router.push("http://localhost:3002/dashboard");
    }else
{
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      console.log("Token:", data.token);
      console.log("User ID:", data.user.id);

      // Redirect to /appointment after successful login
      router.replace("/appointment");
    } else {
      alert("Error occurred while logging in!");
    }
  };
  }
  // Google Login Handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/google";
    
    const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // ✅ Store Token in Local Storage
      localStorage.setItem("token", token);
      console.log("Token stored:", token);
    } else {
      console.log("No token found");
    }
  }, [token]);
  };
 
  
  useEffect(() => {
    const token = localStorage.getItem("token");  
    if (token) {
      router.replace("/appointment"); // Redirect if token exists
    }
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles["login-container"]}>
      {/* Login Form */}
      <div className={styles["login-box"]}>
        <div className={styles["login-header"]}>
          <h2>Login</h2>
          <p className={styles["signup-message"]}>
            Are you a new member? <Link href="/signUp">Sign up here</Link>
          </p>
        </div>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <div className={styles["button-group"]}>
            <button className={styles["login-button"]} type="submit">
              Login
            </button>
            <button className={styles["reset-button"]} type="reset">
              Reset
            </button>
            <p className={styles["forgot-password"]}>Forgot Password?</p>
          </div>
        </form>

        {/* Google Login Button */}
        <div className={styles["google-login"]}>
          <button
            className={styles["google-button"]}
            onClick={handleGoogleLogin}
          >
            <img
              src="/google-logo.png"
              alt="Google Logo"
              className={styles["google-logo"]}
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
