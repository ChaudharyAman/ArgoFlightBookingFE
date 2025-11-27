import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../api/bookings";

export default function TicketPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBookingById(id).then((res) => setBooking(res.data));
  }, [id]);

  if (!booking) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-lg font-semibold text-darkText mb-1">
              {booking.trip.from} → {booking.trip.to}
            </h1>
            <p className="text-xs text-slate-500">
              {new Date(booking.trip.date).toLocaleDateString()} •{" "}
              {booking.trip.time}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Booking ID: {booking._id}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Total Paid</p>
            <p className="text-xl font-semibold text-emerald-500">
              ₹{booking.totalPrice}
            </p>
          </div>
        </div>

        <div className="bg-primarySoft rounded-xl p-4 flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-slate-500">Passenger</p>
            <p className="text-sm font-semibold text-darkText">
              {booking.user?.name || "Traveler"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Seats: {booking.seats.join(", ")}
            </p>
          </div>
          <div className="w-24 h-24 bg-white flex items-center justify-center rounded-lg text-xs text-slate-500">
            QR Code
          </div>
        </div>

        <div className="text-xs text-slate-500 space-y-3">
          <h2 className="text-sm font-semibold text-darkText">
            Terms and Conditions
          </h2>
          <p>
            Please arrive at the boarding point at least 30 minutes before the
            departure time. Carry a valid ID proof along with this ticket.
          </p>
          <p>
            Tickets are non-transferable. Changes or cancellations are subject
            to the operator&apos;s policy and may incur additional charges.
          </p>
        </div>
      </div>
    </div>
  );
}
