import { useState } from "react";
import { registerUser } from "../api/service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return "All fields are required";
    }

    if (!form.email.includes("@")) {
      return "Enter a valid email";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setError("");
      setLoading(true);

      await registerUser(form);

      nav("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10">

        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Join and manage your job requests easily
        </p>

        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        
        <form onSubmit={submit} className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

        
          <button
            disabled={loading}
            className={`w-full p-4 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

      </div>
    </div>
  );
}