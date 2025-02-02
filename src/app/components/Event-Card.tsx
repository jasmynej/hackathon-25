'use client'
import React, { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  eventDate: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, tags, eventDate }) => {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");

  return (
    <div
      className={`p-5 shadow-lg rounded-xl flex flex-col gap-3 cursor-pointer transition-all duration-300 transform 
        ${status === "accepted" ? "bg-green-100" : status === "declined" ? "bg-red-100" : "bg-white"} 
        hover:scale-105`}
    >
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-lg" />
      
      <div className="flex flex-col">
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="text-sm text-gray-500">{eventDate}</p>
      </div>

      <p className="text-gray-600 line-clamp-3 flex-grow">{description}</p>
      
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between mt-3">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => setStatus("declined")}
        >
          Decline
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={() => setStatus("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Card;
