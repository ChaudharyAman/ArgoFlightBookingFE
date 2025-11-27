import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      localStorage.setItem("token", data.token);
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card px-8 py-10">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primarySoft flex items-center justify-center">
            <span className="text-primary text-xl">✈️</span>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-center text-darkText">
          Log In to Journey Booking Platform
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Welcome back! Please enter your credentials to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary text-slate-800"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
              <span className="absolute right-3 top-2.5 text-slate-400 text-lg">
                @
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary text-slate-800"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg shadow-md transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
