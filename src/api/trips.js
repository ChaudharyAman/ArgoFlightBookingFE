import api from "./axios";

export const fetchTrips = (params) => api.get("/trips", { params });

export const fetchTripById = (id) => api.get(`/trips/${id}`);
export const adminCreateTrip = (data) => api.post("/admin/trips", data);
export const adminDeleteTrip = (id) => api.delete(`/admin/trips/${id}`);
export const adminUpdateTrip = (id, data) => api.put(`/admin/trips/${id}`, data);




export const fetchLocations = () => api.get("/locations");
