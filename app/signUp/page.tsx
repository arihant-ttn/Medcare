"use client"; // If using Next.js App Router
import { useState } from "react";

import Link from "next/link";
import styles from "../../components/styles/signUp.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className={styles["login-container"]}>
      {/* Login Form */}
      <div className={styles["login-box"]}>
        <div className ={styles["login-header"]}>
        <h2 >Sign Up</h2>
        <p className={styles["signup-message"]}>
          Already a member? <Link href="/login">Login here</Link>
        </p>
        </div>
        <form className ={styles["login-form"]}onSubmit={handleSubmit}>
        <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles["button-group"]}>
            <button className={styles["login-button"]}type="submit">Submit</button>
            <button className={styles["reset-button"]} type="reset">Reset</button>
            
          </div>
        </form>


        
      </div>
    </div>
  );
};

export default Login;
