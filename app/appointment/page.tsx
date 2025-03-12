"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../components/styles/appointments.module.css";
import Footer from "@/components/footer";
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  gender: "Male" | "Female";
  image: string;
}

const fetchDoctors = async (): Promise<Doctor[]> => {
  const res = await fetch("/doctorsData.json");
  const data = await res.json();
  return data;
};

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("showAll");
  const [rating, setRating] = useState("");
  const [gender, setGender] = useState("showAll");

  useEffect(() => {
    fetchDoctors().then(setDoctors);
  }, []);

  // Function to reset all filters
  const resetFilters = () => {
    setSearch("");
    setExperience("showAll");
    setRating("");
    setGender("showAll");
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(search.toLowerCase()) &&
      (experience === "showAll" ||
        (experience === "15+" && doctor.experience >= 15) ||
        (experience === "10-15" && doctor.experience >= 10 && doctor.experience < 15) ||
        (experience === "5-10" && doctor.experience >= 5 && doctor.experience < 10) ||
        (experience === "3-5" && doctor.experience >= 3 && doctor.experience < 5) ||
        (experience === "1-3" && doctor.experience >= 1 && doctor.experience < 3) ||
        (experience === "0-1" && doctor.experience < 1)) &&
      (rating === "" || doctor.rating === parseInt(rating)) &&
      (gender === "showAll" || doctor.gender === gender)
    );
  });

  return (
    <><div className={styles.container}>
      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchTitle}>Find a doctor at your own ease</div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className={styles.searchBtn}>Search</button>

        </div>
      </div>
      <div className={styles.doctorCount}>
        <h2>{filteredDoctors.length} Doctors Available</h2>

        <p>Book appointments with minimum wait-time & verified doctor details</p>
      </div>

      {/* Filters Section */}
      <div className={styles.doctorContainer}>

        <div className={styles.filters}>

          {/* Reset Button */}
          <div className={styles.filterheader}>
            <span className={styles.filterText}>Filter By:   </span>
            <button className={styles.resetBtn} onClick={resetFilters}>

              Reset
            </button>
          </div>

          {/* Experience */}
          <div className={styles.filterGroup}>
            <h4>Experience</h4>
            {["showAll", "15+", "10-15", "5-10", "3-5", "1-3", "0-1"].map((exp) => (
              <label key={exp}>
                <input
                  type="radio"
                  name="experience"
                  value={exp}
                  checked={experience === exp}
                  onChange={() => setExperience(exp)} />
                {exp === "showAll" ? "Show All" : ` ${exp} Years`}
              </label>
            ))}
          </div>

          {/* Rating */}
          <div className={styles.filterGroup}>
            <h4>Rating</h4>
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name="rating"
                  value={star.toString()}
                  checked={rating === star.toString()}
                  onChange={() => setRating(star.toString())} />
                {star} star
              </label>
            ))}
          </div>

          {/* Gender */}
          <div className={styles.filterGroup}>
            <h4>Gender</h4>
            {["showAll", "Male", "Female"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)} />
                {g === "showAll" ? "Show All" : g}
              </label>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className={styles.doctorSection}>


          <div className={styles.doctorsList}>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} className={styles.card}>
                  <Image src="/Frame.png" alt={doctor.name} width={100} height={100} className={styles.image} />
                  <div className={styles.details}>
                    <h3>{doctor.name}</h3>
                    <div><p>{doctor.specialization}</p>
                      <p>{doctor.experience} Years</p> </div>

                    <p>⭐ {doctor.rating}</p>
                    <button className={styles.bookBtn}>Book Appointment</button>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noResults}>No doctors found.</p>
            )}
          </div>
        </div>
      </div>
    </div><Footer /></>
  );
};

export default DoctorsList;
