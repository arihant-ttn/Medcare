import fs from "fs/promises"; 
import path from "path";
import React from "react";
import Image from "next/image";
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
}

const getDoctorsData = async (): Promise<Doctor[]> => {
  const filePath = path.join(process.cwd(), "public", "doctorsData.json"); 
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
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
    <div className="p-6">
      <Image src="/Frame.png" alt={doctor.name} width={100} height={100} />
      <h1 className="text-2xl font-bold">{doctor.name}</h1>
      <p className="text-gray-600">{doctor.specialization}</p>
      <p className="mt-4">{doctor.description}</p>
      <p className="text-gray-700 mt-2">📍 {doctor.location}</p>
    </div>
  );
};

export default Page;
