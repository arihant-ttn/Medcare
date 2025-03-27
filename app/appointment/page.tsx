"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../components/styles/appointments.module.css";
import Footer from "@/components/footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CheckAuth from "@/components/CheckAuth";
// ✅ Doctor Interface
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  gender: "Male" | "Female";
  image: string;
}

// ✅ Fetch Doctors from API
const fetchDoctors = async (filters: {
  search?: string;
  rating?: string;
  experience?: string;
  gender?: string;
  page?: number;
  limit?: number;
}) => {
  const filteredParams = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, v]) => v !== undefined && v !== "undefined" && v !== ""
    )
  );
  const queryParams = new URLSearchParams(filteredParams as any).toString();
  console.log("API Request URL:", `http://localhost:3000/listDoctors?${queryParams}`);

  const res = await fetch(`http://localhost:3000/listDoctors?${queryParams}`);

  if (!res.ok) throw new Error("Failed to fetch doctors");

  const data = await res.json();
  console.log("data", data);
  return data;
};

const DoctorsList = () => {
  const route = useRouter(); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const doctorsPerPage = 6; //  Doctors per page
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  //  Filter States
  const [search, setSearch] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [rating, setRating] = useState<string>("showAll");
  const [gender, setGender] = useState<string>("showAll");

 
  //  Fetch Doctors on Page Load & Filter Change
  useEffect(() => {
    const filters = {
      search,
      rating: rating !== "showAll" ? rating : undefined,
      experience: experience || undefined,
      gender: gender !== "showAll" ? gender : undefined,
      page: currentPage,
      limit: doctorsPerPage,
    };

    fetchDoctors(filters)
      .then((data) => {
        console.log("✅ Fetched Data:", data);
        setFilteredDoctors(data.doctors);
        setTotalDoctors(data.totalDoctors);
        setDoctors(data.fDoctors);
      })
      .catch((error) => {
        console.error("❌ Error fetching doctors:", error);
        setFilteredDoctors([]);
        setTotalDoctors(0);
      });
  }, [search, experience, rating, gender, currentPage]);

  //  Handle Search
  const handleSearch = (value: string) => {
    setSearch(value);
    
  };

  
  //  Generate Pagination with Ellipsis
  const generatePageNumbers = () => {
    const totalPages = Math.ceil(totalDoctors / doctorsPerPage);
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalDoctors / doctorsPerPage)));
  };

  //  Go to Previous Page
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  //  Reset All Filters
  const resetFilters = () => {
    setSearch("");
    setExperience("");
    setRating("showAll");
    setGender("showAll");
    setCurrentPage(1);
    fetchDoctors({ page: 1, limit: doctorsPerPage }).then(setFilteredDoctors);
  };

  
  return (
    <>
    <CheckAuth/>
    
      <div className={styles.container}>
        {/*  Search Bar */}
        <div className={styles.boxShadow}>
          <div className={styles.searchSection}>
            <div className={styles.searchTitle}>
              Find a doctor at your own ease
            </div>

            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search for doctors..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/*  Doctor Count Info */}
        <div className={styles.doctorCount}>
          <h2>{doctors.length} Doctors Available</h2>
          <p>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </div>

        {/*  Filters Section */}
        <div className={styles.doctorContainer}>
          <div className={styles.filters}>
            <div className={styles.filterheader}>
              <span className={styles.filterText}>Filter By:</span>
              <button className={styles.resetBtn} onClick={resetFilters}>
                Reset
              </button>
            </div>

            {/*  Rating Filter */}
            <div className={styles.filterGroup}>
              <h4>Rating</h4>
              {["showAll", 1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    value={star.toString()}
                    checked={rating === star.toString()}
                    onChange={() => setRating(star.toString())}
                  />
                  {star === "showAll" ? "Show All" : ` ${star} Star`}
                </label>
              ))}
            </div>

            {/*  Experience Filter */}
            <div className={styles.filterGroup}>
              <h4>Experience</h4>
              {["15+", "10-15", "5-10", "3-5", "1-3", "0-1"].map((exp) => (
                <label key={exp}>
                  <input
                    type="radio"
                    name="experience"
                    value={exp}
                    checked={experience === exp}
                    onChange={() => setExperience(exp)}
                  />
                  {exp} Years
                </label>
              ))}
            </div>

            {/*  Gender Filter */}
            <div className={styles.filterGroup}>
              <h4>Gender</h4>
              {["showAll", "Male", "Female"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  {g === "showAll" ? "Show All" : g}
                </label>
              ))}
            </div>
          </div>

          {/*  Doctor List Section */}
          <div className={styles.rightSection}>
            <div className={styles.doctorSection}>
              <div className={styles.doctorsList}>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <div key={doctor.id} className={styles.card}>
                      <Link
                        key={doctor.id}
                        href={`./doctor-profile/${doctor.id}`}
                      >
                        <div>
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={100}
                            height={100}
                            className={styles.image}
                          />
                          <h3>{doctor.name}</h3>
                        </div>
                      </Link>
                      <div className={styles.details}>
                        <div className={styles.rateSpecial}>
                          <p>
                            <Image
                              src="/Stethoscope.png"
                              alt="Specialization"
                              width={17}
                              height={15}
                              className={styles.image}
                            />
                            {doctor.specialization}
                          </p>
                          <p>
                            <Image
                              src="/Hourglass.png"
                              alt="Experience"
                              width={17}
                              height={15}
                              className={styles.image}
                            />
                            {doctor.experience} Years
                          </p>
                        </div>
                        <p>
                          Ratings:
                          {Array.from({ length: doctor.rating }, (_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </p>
                        <button
                          className={styles.bookBtn}
                          onClick={() =>
                            route.push(`/appointments-form?id=${doctor.id}`)
                          }
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noResults}>No doctors found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*  Pagination Section with Ellipsis */}
        <div className={styles.pagination}>
        <button
            onClick={prevPage}
            className={`${styles.dirBtn} ${
              currentPage === 1 ? styles.disabledBtn : ""
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {generatePageNumbers().map((num, index) => (
            <button
              key={index}
              className={`${
                currentPage === num
                  ? styles.activePage
                  : num === "..."
                  ? styles.ellipsis
                  : styles.pageBtn
              }`}
              onClick={() => typeof num === "number" && setCurrentPage(num)}
              disabled={num === "..."}
            >
              {num}
            </button>
          ))}
          <button
            onClick={nextPage}
            className={`${styles.dirBtn} ${
              currentPage === Math.ceil(totalDoctors / doctorsPerPage)
                ? styles.disabledBtn
                : ""
            }`}
            disabled={currentPage === Math.ceil(totalDoctors / doctorsPerPage)}
          >
            Next
          </button>
        </div>
      </div>

      {/*  Footer */}
      <Footer />
    </>
  );
};

export default DoctorsList;
