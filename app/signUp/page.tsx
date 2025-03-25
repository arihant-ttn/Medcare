"use client"; // If using Next.js App Router
import { useState,ChangeEvent, FormEvent,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../components/styles/signUp.module.css";
interface FormData {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/appointment"); // Redirect if logged in
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Sign Up Successful ");
    } else {
      alert("Error occurred while signing up!");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            name="name"
            onChange={handleChange}
            required
          />
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
            <button className={styles["login-button"]}type="submit">Submit</button>
            <button className={styles["reset-button"]} type="reset">Reset</button>
            
          </div>
        </form>


        
      </div>
    </div>
  );
};

export default Login;
