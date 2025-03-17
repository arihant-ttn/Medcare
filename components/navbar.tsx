"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles["nav-container"]}>
      <div className={styles["list-container"]}>
        <div className={styles["logo-title"]}>
          <span>
            <div className={styles["frame"]}>
              <Image className={styles.img}src="/Trust.png" alt="Logo" width={30} height={30} />
            </div>
          </span>
          <h1>MedCare</h1>
        </div>

        {/* Hamburger Icon */}
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
          <div className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
        </div>

        {/* Navigation Links */}
        <ul className={`${styles["link-list"]} ${isOpen ? styles.show : ""}`}>
          <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/appointment" onClick={() => setIsOpen(false)}>Appointment</Link></li>
          <li><Link href="/healthblog" onClick={() => setIsOpen(false)}>Health Blog</Link></li>
          <li><Link href="/reviews" onClick={() => setIsOpen(false)}>Reviews</Link></li>

        </ul>
      </div>
      <div className={`${styles.buttons} ${isOpen ? styles.show : ""}`}>
        <Link href="/login"><button onClick={() => setIsOpen(false)} className={styles["login"]}>Login</button></Link>
        <Link href="/signUp"><button onClick={() => setIsOpen(false)} className={styles["register"]}>Register</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
