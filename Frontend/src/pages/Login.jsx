import { useState } from "react";
import { loginUser } from "../api/service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.email || !form.password) {
      return "All fields are required";
    }

    if (!form.email.includes("@")) {
      return "Enter a valid email";
    }

    return null;
  };

  const login = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10">

        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Login to continue managing jobs
        </p>

        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        
        <form onSubmit={login} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
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
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}