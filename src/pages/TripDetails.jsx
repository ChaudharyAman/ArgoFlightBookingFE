import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTripById } from "../api/trips";
import SeatGrid from "../components/SeatGrid";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTripById(id)
      .then((res) => setTrip(res.data))
      .catch(console.error);
  }, [id]);

  if (!trip) return <div className="p-8 text-center">Loading...</div>;

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    navigate("/checkout", {
      state: { trip, seats: selectedSeats },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-6">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500" />
        <div className="px-6 py-5 flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-400 mb-1">Trip Details</p>
            <h1 className="text-xl font-semibold text-darkText">
              {trip.from} → {trip.to}
            </h1>
            <p className="text-sm text-slate-500">
              {new Date(trip.date).toLocaleDateString()} • {trip.time}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Fare per seat</p>
            <p className="text-2xl font-semibold text-primary">
              ₹{trip.price}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-darkText mb-4">
          Select Your Seat
        </h2>
        <SeatGrid
          totalSeats={trip.totalSeats}
          bookedSeats={trip.bookedSeats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">Selected Seats</p>
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-slate-500">None selected yet</p>
            ) : (
              <p className="text-sm font-medium text-darkText">
                {selectedSeats.sort((a, b) => a - b).join(", ")}
              </p>
            )}
          </div>
          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-md disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
