import { useEffect, useState } from "react";
import { adminCreateTrip, adminDeleteTrip, fetchTrips } from "../../api/trips";
import { FaPlane } from "react-icons/fa";

export default function AdminDashboard() {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
  });

  const loadTrips = async () => {
    const { data } = await fetchTrips();
    setTrips(data);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await adminCreateTrip({
      ...form,
      price: Number(form.price),
      totalSeats: Number(form.totalSeats),
    });

    setShowModal(false);
    setForm({
      from: "",
      to: "",
      date: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      totalSeats: "",
    });

    loadTrips();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this trip?")) return;
    await adminDeleteTrip(id);
    loadTrips();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4 text-darkText">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Trips</p>
          <p className="text-2xl font-semibold text-darkText">{trips.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-darkText">
            Trip Management
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-full bg-primary text-white text-xs font-medium"
          >
            + Add New Trip
          </button>
        </div>

        <div className="overflow-x-auto text-xs md:text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-2 px-2">Route</th>
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Timing</th>
                <th className="py-2 px-2">Duration</th>
                <th className="py-2 px-2">Price</th>
                <th className="py-2 px-2">Seats</th>
                <th className="py-2 px-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((t) => (
                <tr key={t._id} className="border-b last:border-0">
                  <td className="py-2 px-2">
                    {t.from} → {t.to}
                  </td>

                  <td className="py-2 px-2">
                    {new Date(t.date).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-2 flex items-center gap-2">
                    <span>{t.departureTime}</span>
                    <FaPlane className="text-primary rotate-90 text-xs" />
                    <span>{t.arrivalTime}</span>
                  </td>

                  <td className="py-2 px-2 text-slate-600">{t.duration}</td>

                  <td className="py-2 px-2">₹{t.price}</td>

                  <td className="py-2 px-2">{t.totalSeats}</td>

                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-xs text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {trips.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 text-center text-xs text-slate-500"
                  >
                    No trips yet. Click “Add New Trip” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl shadow-card p-6 w-full max-w-md">
            <h3 className="text-sm font-semibold text-darkText mb-4">
              Trip Details
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">From</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.from}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, from: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">To</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.to}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, to: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Date</label>
                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Departure Time
                </label>
                <input
                  type="time"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.departureTime}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      departureTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Arrival Time
                </label>
                <input
                  type="time"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.arrivalTime}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      arrivalTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Price</label>
                <input
                  type="number"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Total Seats
                </label>
                <input
                  type="number"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2"
                  value={form.totalSeats}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, totalSeats: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-primary text-white text-xs font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
