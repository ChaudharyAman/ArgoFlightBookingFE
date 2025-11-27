import { Link } from "react-router-dom";
import { FaClock, FaChair, FaCalendarAlt, FaStar } from "react-icons/fa";

export default function TripCard({ trip }) {
  const imageList = [
    "https://media.istockphoto.com/id/2239942020/photo/the-daily-walk-in-the-city-that-never-sleeps.webp?a=1&b=1&s=612x612&w=0&k=20&c=-Q7ZiO1tIMlHIwf0IJMVOfkUG162a8gr7znAGf2-8Xs=",
    "https://plus.unsplash.com/premium_photo-1679830513869-cd3648acb1db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1572573385781-2fd4f8c1389e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1507812984078-917a274065be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpcnBsYW5lfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1499063078284-f78f7d89616a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFpcnBsYW5lfGVufDB8fDB8fHww"
  ];

  const image = imageList[Math.floor(Math.random() * imageList.length)];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border overflow-hidden">
      <div className="relative h-32 w-full">
        <img src={image} className="w-full h-full object-cover" alt="Trip" />

        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
          Popular
        </span>
        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
          20% OFF
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
          <span className="text-slate-500 ml-1">(356 reviews)</span>
        </div>

        <h3 className="font-semibold text-darkText text-md mb-1">
          {trip.from} → {trip.to}
        </h3>

        <div className="space-y-1 text-xs text-slate-600 mb-3">
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>{trip.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaChair className="text-primary" />
            <span>{trip.totalSeats - trip.bookedSeats.length} seats available</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <span>{new Date(trip.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-darkText">₹{trip.price}</p>
            <p className="text-xs line-through text-slate-400">
              ₹{Math.round(trip.price * 1.2)}
            </p>
          </div>

          <Link
            to={`/trip/${trip._id}`}
            className="px-4 py-2 text-xs font-medium bg-primary text-white rounded-full shadow hover:bg-primary/90"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
