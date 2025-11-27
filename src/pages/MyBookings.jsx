import { useEffect, useState } from "react";
import { getMyBookings } from "../api/bookings";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoAirplaneOutline } from "react-icons/io5";
import { FaTrainSubway } from "react-icons/fa6";

export default function MyBookings() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    getMyBookings()
      .then((res) => {
        if (res.data.upcoming) {
          setUpcoming(res.data.upcoming);
          setPast(res.data.past);
          return;
        }

        const now = new Date();
        const u = [];
        const p = [];

        res.data.forEach((b) => {
          const date = new Date(b.trip.date);
          if (date >= now && b.status !== "cancelled") u.push(b);
          else p.push(b);
        });

        setUpcoming(u);
        setPast(p);
      })
      .catch(console.error);
  }, []);

  const BookingCard = ({ b }) => {
    const isFlight = b.trip.type === "flight";
    const icon = isFlight ? (
      <IoAirplaneOutline className="text-sky-600 text-xl" />
    ) : (
      <FaTrainSubway className="text-emerald-600 text-lg" />
    );

    const tagColor =
      b.status === "completed"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-sky-100 text-sky-700";

    return (
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-slate-500">Booking ID: {b._id}</p>
            <p className="text-sm font-semibold text-darkText">
              {b.trip.from} → {b.trip.to}
            </p>
          </div>

          <span
            className={`text-[10px] px-2 py-1 rounded-full font-medium capitalize ${tagColor}`}
          >
            {b.status}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1 text-xs text-slate-600">
          {icon}
          <p>{new Date(b.trip.date).toLocaleDateString()}</p>
        </div>

        <p className="text-xs text-slate-500 mb-1">
          {b.trip.departureTime} — {b.trip.arrivalTime}
        </p>

        <p className="text-xs text-slate-500 mb-3">
          Seats: {b.seats.join(", ")}
        </p>

        <div className="h-16 bg-sky-50 rounded-lg flex justify-center items-center border border-sky-100">
          {icon}
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-semibold text-emerald-500">₹{b.totalPrice}</p>

          <Link
            to={`/ticket/${b._id}`}
            className="text-xs text-primary font-medium flex items-center gap-1"
          >
            View Ticket
            <HiOutlineArrowNarrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    );
  };

  const Section = ({ title, items }) => (
    <div className="mb-10">
      <h2 className="text-sm font-semibold text-darkText mb-3">{title}</h2>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500">No bookings.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((b) => (
            <BookingCard key={b._id} b={b} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6 text-darkText">My Bookings</h1>

      <Section title="Upcoming Bookings" items={upcoming} />
      <Section title="Past Bookings" items={past} />
    </div>
  );
}
