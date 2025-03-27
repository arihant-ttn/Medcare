"use client";

import Image from "next/image";
import { useState ,useEffect} from "react";
import styles from "../../components/styles/appointments-form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/footer";
import CalendarSlider from "@/components/calendarSlider";
import CheckAuth from "@/components/CheckAuth";
const MainSection = () => {
  // console.log(getUserIdFromToken);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  
  // ✅ Doctor ID from Query Params
  const docId = searchParams.get("id");
  const userId = localStorage.getItem("userId");
  // ✅ States to Store Form Data
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<string>("Video Consult"); // Default
  const [hospital, setHospital] = useState<string>("Medical HeartInstitute Okhla New Delhi");
  const  [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [userId, setUserId] = useState<number | null>(null);
  // ✅ Simulated Logged-in User ID (Replace with actual user ID)
   // Replace with actual logged-in userId from session/auth
   
  // ✅ Handle Slot Selection
  const handleSlotSelection = (shift: string, slotTime: string) => {
    console.log(`Selected Shift: ${shift}, Slot: ${slotTime}`);
    setSelectedShift(shift);
    setSlot(slotTime);
  };

  // ✅ Handle Visit Type Toggle
  const handleVisitTypeChange = (type: string) => {
    setVisitType(type);
  };

  // ✅ Handle Hospital Selection
  const handleHospitalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHospital(event.target.value);
  };

  // ✅ Handle Calendar Date Selection
  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };

  // 🎯 Send Data to Backend on Submit
  const handleSubmit = async () => {
    if (!slot || !selectedDate || !selectedShift) {
      alert("❗️ Please select a slot, date, and shift.");
      return;
    }

    const appointmentData = {
      doctorId: docId,
      userId: userId,
      visitType,
      hospital,
      selectedShift,
      slot,
      selectedDate,
    };

    console.log("✅ Sending Data to Backend:", appointmentData);

    try {
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (res.ok) {
        alert("✅ Appointment booked successfully!");
        router.push("/appointment-success");
      } else {
        throw new Error("Failed to book appointment.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
    <CheckAuth/>
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
              <button className={styles["book-btn"]} onClick={handleSubmit}>
                Book Appointment
              </button>
            </div>

            {/* Toggle for Video or Hospital Visit */}
            <div className={styles["toggle-container"]}>
              <button
                className={`${styles["toggle-btn"]} ${
                  visitType === "Video Consult" ? styles["active"] : ""
                }`}
                onClick={() => handleVisitTypeChange("Video Consult")}
              >
                Book Video Consult
              </button>
              <button
                className={`${styles["toggle-btn"]} ${
                  visitType === "Hospital Visit" ? styles["active"] : ""
                }`}
                onClick={() => handleVisitTypeChange("Hospital Visit")}
              >
                Book Hospital Visit
              </button>
            </div>

            {/* Dropdown for Hospital Selection */}
            <select
              className={styles["dropdown"]}
              value={hospital}
              onChange={handleHospitalChange}
            >
              <option value="Medical HeartInstitute Okhla New Delhi">
                Medical HeartInstitute Okhla New Delhi
              </option>
          
            </select>

            {/* Calendar Slider */}
            <div className={styles["calendar-slider"]}>
              <CalendarSlider onDateSelect={handleDateSelection} />
            </div>

            {/* Shift & Slot Selection */}
            <div className={styles["shift-container"]}>
              {/* Morning Shift Slots */}
              <div className={styles["shift-section"]}>
                <h4>
                  <Image
                    className={styles["sun-image"]}
                    src="/sun.png"
                    alt="Morning Shift"
                    height={20}
                    width={20}
                    style={{ objectFit: "cover" }}
                  />
                  Morning
                </h4>
                <hr />
                <div className={styles["slot-container"]}>
                  {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"].map((time) => (
                    <button
                      key={time}
                      className={`${styles["slot-btn"]} ${
                        slot === time && selectedShift === "Morning" ? styles["activeSlot"] : ""
                      }`}
                      onClick={() => handleSlotSelection("Morning", time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Shift Slots */}
              <div className={styles["shift-section"]}>
                <h4>
                  <Image
                    className={styles["sun-image"]}
                    src="/sunset.png"
                    alt="Afternoon Shift"
                    height={20}
                    width={20}
                    style={{ objectFit: "cover" }}
                  />
                  Afternoon
                </h4>
                <hr />
                <div className={styles["slot-container"]}>
                  {["3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"].map((time) => (
                    <button
                      key={time}
                      className={`${styles["slot-btn"]} ${
                        slot === time && selectedShift === "Afternoon" ? styles["activeSlot"] : ""
                      }`}
                      onClick={() => handleSlotSelection("Afternoon", time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button className={styles["next-button"]} onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MainSection;
