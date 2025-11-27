import { useEffect, useState } from "react";
import { fetchTrips, fetchLocations } from "../api/trips";
import TripCard from "../components/TripCard";
import { FaSearchLocation, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function Home() {
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const [locations, setLocations] = useState({ from: [], to: [] });

  const loadLocations = async () => {
    try {
      const { data } = await fetchLocations();

      console.log("Locations from backend:", data);

      setLocations({
        from: Array.isArray(data.from) ? data.from : [],
        to: Array.isArray(data.to) ? data.to : []
      });
    } catch (err) {
      console.error("Location Error:", err);
      setLocations({ from: [], to: [] });
    }
  };

  const loadTrips = async () => {
    setLoading(true);
    try {
      const { data } = await fetchTrips(filters);
      setTrips(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
    loadTrips();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadTrips();
  };

  return (
    <div>
      <section className="bg-primarySoft border-b">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">
              Find Your Next Journey
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-darkText mb-3 leading-tight">
              Discover available trips and book your seats with ease.
            </h1>

            <p className="text-sm md:text-base text-slate-600">
              Choose from carefully selected destinations at the best prices.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-8 bg-white rounded-2xl shadow-card px-5 py-4 flex flex-col md:flex-row gap-3 items-end"
          >
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                From
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-primary text-sm" />

                <select
                  className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                  value={filters.from}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, from: e.target.value }))
                  }
                >
                  <option value="">Select location</option>

                  {locations.from.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                To
              </label>
              <div className="relative">
                <FaSearchLocation className="absolute left-3 top-3 text-primary text-sm" />

                <select
                  className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                  value={filters.to}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, to: e.target.value }))
                  }
                >
                  <option value="">Select destination</option>

                  {locations.to.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full md:w-56">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Date
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-primary text-sm" />

                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  value={filters.date}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium shadow-md whitespace-nowrap"
            >
              Search Trips
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4 text-darkText">
          Available Trips
        </h2>

        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p className="text-sm text-slate-500">No trips found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
