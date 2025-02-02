'use client'
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Left side image container */}
      <div className="w-4/10 h-full relative">
        <Image 
          src="/ps-home-logo.jfif" 
          alt="Landing Page Image" 
          layout="fill" 
          objectFit="cover" 
        />
      </div>

      {/* Right side content with background and spacing adjustments */}
      <div className="w-6/10 flex flex-col justify-center items-start p-12 bg-[#f8e1e6]"> {/* light pink background */}
        <div className="flex items-center mb-6">
          <Image src='/logo.svg' alt="Logo" width={50} height={50} />
          <h2 className="ml-4 text-3xl font-semibold text-[#fe414d]">Momentum</h2>
        </div>
        <br></br>
        <p className="mb-6 text-left text-lg">
          Welcome to Momentum, Publicis Sapient’s tool that enhances employee engagement, helping you stay connected to your community and never miss an opportunity!
        </p>
        <br></br>
        <Link href="/dashboard">
          <button className="mt-6 px-6 py-3 text-lg bg-[#fe414d] text-white rounded-lg hover:bg-[#e3404b] transition duration-300">
            Login here to continue
          </button>
        </Link>
      </div>
    </div>
  );
}
