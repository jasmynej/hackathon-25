import React from "react";
import Card from "@/app/components/Event-Card";

const eventsData = [
  {
    title: "Tech Conference 2025",
    description: "Join us for a groundbreaking event on the latest trends in technology!",
    imageUrl: "/event.jpg",
    tags: ["Technology", "Conference", "Networking"],
    eventDate: "Tuesday, February 4, 2025",
  },
  {
    title: "AI Summit",
    description: "Explore the future of artificial intelligence with industry experts.",
    imageUrl: "/event.jpg",
    tags: ["AI", "Machine Learning", "Innovation"],
    eventDate: "Wednesday, March 12, 2025",
  },
  {
    title: "Web Development Bootcamp",
    description: "Learn full-stack web development with hands-on projects and mentorship.",
    imageUrl: "/event.jpg",
    tags: ["Web Dev", "Coding", "JavaScript"],
    eventDate: "Saturday, April 20, 2025",
  },
  {
    title: "Startup Pitch Night",
    description: "Watch startups pitch their ideas to investors and network with founders.",
    imageUrl: "/event.jpg",
    tags: ["Entrepreneurship", "Investing", "Startups"],
    eventDate: "Friday, May 9, 2025",
  },
];

const EventsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-left text-[#FE414D]">Upcoming Events</h1>
        <p className="text-lg text-left text-[#FE414D]">{new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
      </div>

      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event, index) => (
          <Card
            key={index}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
            tags={event.tags}
            eventDate={event.eventDate}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
