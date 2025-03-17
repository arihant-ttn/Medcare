"use client";
import { useEffect, useState  } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../components/styles/appointments.module.css";
import Footer from "@/components/footer";
import Link from "next/link";
import BookBtn from "@/components/BookBtn";
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
  const route = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("showAll");
  const [gender, setGender] = useState("showAll");

  useEffect(() => {
    fetchDoctors().then(setDoctors);
  }, []);

  // Function to reset all filters
  const resetFilters = () => {
    setSearch("");
    setExperience("");
    setRating("showAll");
    setGender("showAll");
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (doctor.name.toLowerCase().includes(search.toLowerCase()) || 
      doctor.specialization.toLowerCase().includes(search.toLowerCase())) &&
      (experience === "" || 
        (experience === "15+" && doctor.experience >= 15) ||
        (experience === "10-15" && doctor.experience >= 10 && doctor.experience < 15) ||
        (experience === "5-10" && doctor.experience >= 5 && doctor.experience < 10) ||
        (experience === "3-5" && doctor.experience >= 3 && doctor.experience < 5) ||
        (experience === "1-3" && doctor.experience >= 1 && doctor.experience < 3) ||
        (experience === "0-1" && doctor.experience < 1)
      ) &&
      (rating === "showAll" || doctor.rating === parseInt(rating)) &&
      (gender === "showAll" || doctor.gender === gender)
    );
  });
  

  return (
    <><div className={styles.container}>
      {/* Search Bar */}
      <div className={styles.boxShadow}>
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
  {/* Rating */}
          <div className={styles.filterGroup}>
            <h4>Rating</h4>
            {["showAll", 1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name="rating"
                  value={star.toString()}
                  checked={rating === star.toString()}
                  onChange={() => setRating(star.toString())} />
                {star=== "showAll" ? "Show All" : ` ${star} Star`}
              </label>
            ))}
          </div>

          {/* Experience */}
          <div className={styles.filterGroup}>
            <h4>Experience</h4>
            {[ "15+", "10-15", "5-10", "3-5", "1-3", "0-1"].map((exp) => (
              <label key={exp}>
                <input
                  type="radio"
                  name="experience"
                  value={exp}
                  checked={experience === exp}
                  onChange={() => setExperience(exp)} />
                {exp} Years
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
                  <Link key = {doctor.id}href ={ `./doctor-profile/${doctor.id}`}>
                  <div>

                  
                  <Image src="/Frame.png" alt={doctor.name} width={100} height={100} className={styles.image} />
                    <h3>{doctor.name}</h3>
                    </div>
                    </Link>
                  <div className={styles.details}>
                  
                    <div className={styles.rateSpecial}>
                                       <p> <Image src="/Stethoscope.png" alt={doctor.name} width={17} height={15} className={styles.image} />
                                       {doctor.specialization}</p>
                   
                      <p> <Image src="/Hourglass.png" alt={doctor.name} width={17} height={15} className={styles.image} />{doctor.experience} Years</p> 
                      </div>
                      <p>
                        Ratings: 
  {Array.from({ length: doctor.rating }, (_, i) => (
    <span key={i}>⭐</span>
  ))}
</p>
<button className={styles.bookBtn} onClick={()=>route.push(`/appointments-form?id=${doctor.id}`)}>Book Appointment</button>          
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
