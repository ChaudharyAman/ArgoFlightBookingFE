import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createBooking } from "../api/bookings";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.trip) navigate("/");
  }, [state, navigate]);

  if (!state?.trip) return null;

  const { trip, seats } = state;
  const totalPrice = seats.length * trip.price;

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createBooking({
        tripId: trip._id,
        seats,
      });
      navigate("/booking-success", { state: { booking: data } });
    } catch (err) {
      alert("Payment / booking failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6 text-darkText">
        Checkout & Payment
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={handlePayment}
          className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-darkText mb-2">
            Your Information
          </h2>
          {["Full Name", "Email Address", "Phone Number"].map((label) => (
            <div key={label}>
              <label className="text-xs text-slate-500">{label}</label>
              <input
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder={label}
                required
              />
            </div>
          ))}

          <h2 className="text-sm font-semibold text-darkText mt-4">
            Payment Method
          </h2>
          <div className="mt-2 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" defaultChecked className="accent-primary" />
              Credit or Debit Card
            </label>
            <label className="flex items-center gap-2 text-slate-500">
              <input type="radio" disabled />
              Digital Wallet (coming soon)
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-primary text-white text-sm font-medium py-2.5 rounded-full shadow-md"
          >
            Complete Payment
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <p className="text-xs text-slate-400 mb-2">Booking Summary</p>
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-xl p-5 text-white mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase tracking-wide text-slate-300">
                Route
              </span>
              <span className="text-xl">✈️</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-400">From</p>
                <p className="text-base font-semibold">{trip.from}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 text-right">To</p>
                <p className="text-base font-semibold text-right">{trip.to}</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-300 space-y-1">
              <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
              <p>Time: {trip.time}</p>
              <p>Seats: {seats.join(", ")}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-slate-500">Total Fares</p>
            <p className="text-lg font-semibold text-emerald-500">
              ₹{totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
