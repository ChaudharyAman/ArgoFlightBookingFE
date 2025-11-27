export default function SeatGrid({
  totalSeats,
  bookedSeats = [],
  selectedSeats,
  setSelectedSeats,
}) {
  const toggleSeat = (num) => {
    if (bookedSeats.includes(num)) return;

    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== num));
    } else {
      setSelectedSeats([...selectedSeats, num]);
    }
  };

  return (
    <div className="inline-block bg-slate-50 rounded-2xl px-6 py-5">
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map((num) => {
          const isBooked = bookedSeats.includes(num);
          const isSelected = selectedSeats.includes(num);

          return (
            <button
              key={num}
              type="button"
              onClick={() => toggleSeat(num)}
              className={[
                "w-8 h-8 rounded-md text-xs font-medium flex items-center justify-center transition",
                isBooked && "bg-red-200 text-red-700 cursor-not-allowed",
                isSelected && "bg-primary text-white",
                !isBooked && !isSelected && "bg-white border border-slate-200",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm border border-slate-300 bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-300" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-primary" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
