"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "../../components/styles/appointments-form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/footer";
import CalendarSlider from "@/components/calendarSlider";
const MainSection = () => {
  const [selectedShift, setSelectedShift] = useState("morning");
  const searchParams = useSearchParams();
  
const docId = searchParams.get("id");
console.log(docId);
  return (
    <>
      <div className={styles["container"]}>
        {/* Left Section */}
        <div className={styles["left-section"]}>
          <div className={styles["hero-content"]}>
            <h2>Book Your Next Doctor Visit in Seconds..</h2>
            <p>
              CareMate helps you find the best healthcare provider by specialty, location, 
              and more, ensuring you get the care you need.
            </p>
          </div>
        </div>

        {/* Right Section with Background Image */}
        <div className={styles["right-section"]}>
          <div className={styles["HeroImage"]}>
            <Image src="/AppointBack.png" alt="Hero Image" fill style={{ objectFit: "cover" }} />
          </div>

          {/* Form Overlay */}
          <div className={styles["appointment-form"]}>
            {/* Header & Book Button */}
            <div className={styles["form-header"]}>
              <h3>Schedule Appointment</h3>
              <button className={styles["book-btn"]}>Book Appointment</button>
            </div>

            {/* Toggle for Video or Hospital Visit */}
            <div className={styles["toggle-container"]}>
              <button className={styles["toggle-btn"]}>Book Video Consult</button>
              <button className={styles["toggle-btn"]}>Book Hospital Visit</button>
            </div>

            {/* Dropdown for Hospital Selection */}
            <select className={styles["dropdown"]}>
              <option>Select Hospital</option>
              <option>City Hospital</option>
              <option>Green Valley Clinic</option>
              <option>HealthCare Center</option>
            </select>

            {/* Calendar Slider (Placeholder) */}
            <div className={styles["calendar-slider"]}>
               CalendarSlider 
            </div>

            {/* Morning Shift Slots */}
            <div className={styles["shift-container"]}>
            <div className={styles["shift-section"]}>
              <h4><Image className = {styles["sun-image"]}src="/sun.png" alt="Hero Image" height={20} width={20} style={{ objectFit: "cover" }} />Morning </h4>
              <hr />
              <div className={styles["slot-container"]}>
                <button className={styles["slot-btn"]}>9:00 AM</button>
                <button className={styles["slot-btn"]}>9:30 AM</button>
                <button className={styles["slot-btn"]}>10:00 AM</button>
                <button className={styles["slot-btn"]}>10:30 AM</button>
                <button className={styles["slot-btn"]}>9:00 AM</button>
                <button className={styles["slot-btn"]}>9:30 AM</button>
                <button className={styles["slot-btn"]}>10:00 AM</button>
                <button className={styles["slot-btn"]}>10:30 AM</button>
              </div>
            </div>

            {/* Evening Shift Slots */}
            <div className={styles["shift-section"]}>
              <h4><Image className = {styles["sun-image"]}src="/sunset.png" alt="Hero Image" height={20} width={20} style={{ objectFit: "cover" }} />Afternoon</h4>
              <hr />
              <div className={styles["slot-container"]}>
                <button className={styles["slot-btn"]}>5:00 PM</button>
                <button className={styles["slot-btn"]}>5:30 PM</button>
                <button className={styles["slot-btn"]}>6:00 PM</button>
                <button className={styles["slot-btn"]}>6:30 PM</button>
                <button className={styles["slot-btn"]}>5:00 PM</button>
                <button className={styles["slot-btn"]}>5:30 PM</button>
                <button className={styles["slot-btn"]}>6:00 PM</button>
                <button className={styles["slot-btn"]}>6:30 PM</button> 
              </div>
            </div>
            </div>
          
          <button className={styles["next-button"]}>Next</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainSection;
 