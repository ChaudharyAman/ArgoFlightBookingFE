import { useEffect, useState } from "react";
import {
  fetchTrips,
  adminCreateTrip,
  adminDeleteTrip,
  adminUpdateTrip,
} from "../../api/trips";
import { fetchAllBookings } from "../../api/bookings";

import { FaTrash, FaEdit, FaPlane, FaCheckCircle } from "react-icons/fa";
import "../../admin-dashboard.css/admin-dashboard.css";

export default function AdminDashboard() {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
  });

  const loadData = async () => {
    const tripsRes = await fetchTrips();
    setTrips(tripsRes.data);

    const bookingsRes = await fetchAllBookings();
    setBookings(bookingsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openEditModal = (trip) => {
    setIsEditing(true);
    setEditId(trip._id);

    setForm({
      from: trip.from,
      to: trip.to,
      date: trip.date.split("T")[0],
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      price: trip.price,
      totalSeats: trip.totalSeats,
    });

    setShowModal(true);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      totalSeats: Number(form.totalSeats),
    };

    if (isEditing) {
      await adminUpdateTrip(editId, payload);
    } else {
      await adminCreateTrip(payload);
    }

    setShowModal(false);
    setIsEditing(false);

    setForm({
      from: "",
      to: "",
      date: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      totalSeats: "",
    });

    loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this trip?")) return;
    await adminDeleteTrip(id);
    loadData();
  };

  return (
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stats-card">
          <p className="stats-label">Total Trips</p>
          <p className="stats-value">{trips.length}</p>
        </div>

        <div className="stats-card">
          <p className="stats-label">Total Bookings</p>
          <p className="stats-value">{bookings.length}</p>
        </div>

        <div className="stats-card">
          <p className="stats-label">Upcoming Departures</p>
          <p className="stats-value">
            {trips.filter((t) => new Date(t.date) >= new Date()).length}
          </p>
        </div>
      </div>

      <div className="table-box">
        <div className="flex between" style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="table-title">Trip Management</h2>
          <button
            className="btn-primary"
            onClick={() => {
              setIsEditing(false);
              setForm({
                from: "",
                to: "",
                date: "",
                departureTime: "",
                arrivalTime: "",
                price: "",
                totalSeats: "",
              });
              setShowModal(true);
            }}
          >
            + Add New Trip
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Route</th>
                <th>Date</th>
                <th>Timing</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Seats</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((t) => (
                <tr key={t._id}>
                  <td>{t.from} → {t.to}</td>
                  <td>{new Date(t.date).toLocaleDateString()}</td>

                  <td>
                    {t.departureTime}
                    <FaPlane style={{ margin: "0 6px", transform: "rotate(90deg)", color: "#3b82f6" }} />
                    {t.arrivalTime}
                  </td>

                  <td>{t.duration}</td>
                  <td>₹{t.price}</td>
                  <td>{t.totalSeats}</td>

                  <td 
                  className="lastTable"
                  style={{ textAlign: "right" }}>
                    <FaEdit
                      className="action-icon icon-edit"
                      onClick={() => openEditModal(t)}
                    />

                    <FaTrash
                      className="action-icon icon-delete"
                      onClick={() => handleDelete(t._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {trips.length === 0 && <p>No trips found.</p>}
        </div>
      </div>

      <div className="table-box">
        <h2 className="table-title">Booking Management</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Trip</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Status</th>
                <th>QR</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b._id.slice(-6).toUpperCase()}</td>
                  <td>{b.user?.name}</td>
                  <td>{b.trip?.from} → {b.trip?.to}</td>
                  <td>{new Date(b.trip?.date).toLocaleDateString()}</td>
                  <td>{b.seats.join(", ")}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        b.status === "cancelled"
                          ? "status-cancelled"
                          : "status-confirmed"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td>
                    <FaCheckCircle
                      className={
                        b.qrVerified
                          ? "icon-qr-verified action-icon"
                          : "icon-qr-unverified action-icon"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && <p>No bookings found.</p>}
        </div>
      </div>

      {showModal && (
        <div className="modal-bg">
          <div className="modal-box">
            <h3 className="modal-title">
              {isEditing ? "Edit Trip" : "Add Trip"}
            </h3>

            <form onSubmit={handleCreateOrUpdate}>
              {[
                "from",
                "to",
                "date",
                "departureTime",
                "arrivalTime",
                "price",
                "totalSeats",
              ].map((field) => (
                <div className="modal-field" key={field}>
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>

                  <input
                    type={
                      field.includes("Time")
                        ? "time"
                        : field === "date"
                        ? "date"
                        : "text"
                    }
                    value={form[field]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              ))}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-submit">
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
