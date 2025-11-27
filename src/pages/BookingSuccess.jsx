import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.booking) navigate("/");
  }, [state, navigate]);

  if (!state?.booking) return null;

  const { booking } = state;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mb-4">
          ✓
        </div>
        <h1 className="text-xl font-semibold text-darkText mb-1">
          Booking Confirmed!
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Your trip is successfully booked. Enjoy your journey.
        </p>

        <div className="bg-white rounded-2xl shadow-card p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-darkText">
              Flight Ticket
            </h2>
            <span className="text-xs text-slate-400">
              Booking ID: {booking._id.slice(-6).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-slate-400">From</p>
              <p className="text-base font-semibold">
                {booking.trip.from}
              </p>
            </div>
            <span className="text-slate-400">✈️</span>
            <div className="text-right">
              <p className="text-xs text-slate-400">To</p>
              <p className="text-base font-semibold">
                {booking.trip.to}
              </p>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-200 pt-4 mt-2 flex justify-between items-center">
            <div className="text-xs text-slate-500">
              <p>Date: {new Date(booking.trip.date).toLocaleDateString()}</p>
              <p>Time: {booking.trip.time}</p>
              <p>Seats: {booking.seats.join(", ")}</p>
            </div>
            <p className="text-lg font-semibold text-emerald-500">
              ₹{booking.totalPrice}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            to={`/ticket/${booking._id}`}
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm shadow-md"
          >
            View Ticket
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full border border-slate-300 text-sm text-slate-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
