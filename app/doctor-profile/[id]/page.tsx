import fs from "fs/promises";
import path from "path";
import React from "react";
import Image from "next/image";
import styles from "../../../components/styles/doctor-profile.module.css";
import BookBtn from "@/components/BookBtn";


interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  gender: "Male" | "Female";
  reviews: string[];
  location: string;
  description: string;
  morning_time_slot:string;
  evening_time_slot:string;
}

const getDoctorsData = async (): Promise<Doctor[]> => {
  
  const res = await fetch("http://localhost:3000/listDoctors"); // Use relative path
  
  if (!res.ok) throw new Error("Failed to fetch doctors");
  const data= await res.json();
  
  
  return data.doctors;
};

export const generateStaticParams = async () => {
  const doctors = await getDoctorsData();
  return doctors.map((doctor) => ({
    id: doctor.id.toString(),
  }));
};

const Page = async ({ params }: { params: { id: string } }) => {
  const doctors = await getDoctorsData();
  const doctor = doctors.find((doc) => doc.id.toString() === params.id);

  if (!doctor) {
    return <p className="text-red-500 text-center">Doctor Not Found</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>

      
      <Image
        src="/Frame.png"
        alt={doctor.name}
        width={100}
        height={100}
        className={styles.image}
      />
      <div>
      <h1 className={styles.name}>{doctor.name}</h1>

      <p className={styles.specialization}>{doctor.specialization}</p>
      </div>
      </div>
      <p className={styles.description}>{doctor.description}</p>

      {/* Reviews */}
      <div className={styles.reviews}>
        <strong>Patient Reviews:</strong>
        <ul>
          {doctor.reviews.map((review, index) => (
            <li key={index}>⭐ {review}</li>
          ))}
        </ul>
      </div>

      {/* Available Times */}
      <div className={styles.availability}>
        <p>🌞 Morning: {doctor.morning_time_slot}</p>
        <p>🌙 Evening: {doctor.evening_time_slot}</p>
      </div>

      <p className={styles.location}>📍 {doctor.location}</p>

      {/* Book Appointment Button */}
      <BookBtn className={styles.bookButton} id = {doctor.id}/>
      
    </div>
  );
};

export default Page;
