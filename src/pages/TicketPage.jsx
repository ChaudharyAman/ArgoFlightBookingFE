import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../api/bookings";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TicketPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBookingById(id).then((res) => setBooking(res.data));
  }, [id]);

  if (!booking) return <div className="p-8 text-center">Loading...</div>;

  const trip = booking.trip;

  const downloadPDF = async () => {
    const ticket = document.getElementById("ticket-section");
    const canvas = await html2canvas(ticket, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`ticket-${booking._id}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <div id="ticket-section" className="bg-white rounded-2xl shadow-card p-6 mb-8">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-darkText mb-1">
              {trip.from} → {trip.to}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <FaMapMarkerAlt className="text-primary" />
              {trip.from} Airport — {trip.to} Airport
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Total Paid</p>
            <p className="text-2xl font-semibold text-emerald-500">
              ₹{booking.totalPrice}
            </p>

            <button
              onClick={downloadPDF}
              className="mt-2 px-4 py-1.5 bg-primary text-white rounded-full text-xs shadow-sm"
            >
              Download
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-3">
          Emirates A380 Airbus
        </p>

        <div className="bg-slate-50 rounded-xl p-5 border flex flex-col lg:flex-row gap-5">

          <div className="flex-1">

            <div className="flex items-center gap-10 mb-6">
              <div>
                <p className="text-xs text-slate-500">Departure</p>
                <p className="text-2xl font-semibold text-darkText">
                  {trip.departureTime}
                </p>
                <p className="text-xs text-slate-500 mt-1">{trip.from}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Arrival</p>
                <p className="text-2xl font-semibold text-darkText">
                  {trip.arrivalTime}
                </p>
                <p className="text-xs text-slate-500 mt-1">{trip.to}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border flex justify-between">
              <div>
                <p className="text-xs text-slate-500">Passenger</p>
                <p className="text-sm font-semibold text-darkText">
                  {booking.user?.name ?? "Traveler"}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs mt-3">
                  <div>
                    <p className="text-slate-500">Date</p>
                    <p>{new Date(trip.date).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Seat</p>
                    <p>{booking.seats.join(", ")}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Duration</p>
                    <p>{trip.duration}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Gate</p>
                    <p>A2</p>
                  </div>
                </div>
              </div>

              <div className="w-24 h-24 bg-slate-200 rounded-lg shadow-inner flex items-center justify-center text-[10px] text-slate-600">
                QR CODE
              </div>
            </div>
          </div>

          <div className="hidden lg:flex w-px bg-slate-300"></div>

          <div className="flex items-center justify-center flex-col lg:w-40">
            <img
              src="https://cdn-icons-png.flaticon.com/512/34/34627.png"
              className="w-14 opacity-70"
              alt="plane"
            />
            <p className="text-xs text-slate-400 mt-2">
              Boarding Pass
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-darkText mb-4">
          Terms and Conditions
        </h2>

        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <p>
            Please arrive at the boarding point at least 30 minutes before the
            departure time. Carry a valid ID proof along with this ticket.
          </p>
          <p>
            Tickets are non-transferable. Changes or cancellations are subject
            to policy and may incur charges. Credit card details are processed
            securely and encrypted.
          </p>
          <p>
            Argo may request additional verification for security purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
