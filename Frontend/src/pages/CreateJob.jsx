import { useState, useEffect } from "react";
import { createJob } from "../api/service";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJob(form);

      setMessage("Job created successfully!");

      setForm({
        title: "",
        description: "",
        category: "Plumbing",
        location: "",
        contactName: "",
        contactEmail: "",
      });

    } catch (err) {
      setMessage("Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">

      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Create Job Request
        </h1>

        <p className="text-slate-500 mb-8">
          Fill in the details below to post a new job.
        </p>

        {message && (
          <div className="mb-5 bg-blue-50 border border-blue-200 text-blue-600 p-4 rounded-2xl text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              placeholder="Fix kitchen sink"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              placeholder="Describe the issue..."
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
            >
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Painting</option>
              <option>Joinery</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              placeholder="Glasgow"
            />
          </div>

          {/* CONTACT NAME */}
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              Contact Name
            </label>

            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              placeholder="John Doe"
            />
          </div>

          {/* CONTACT EMAIL */}
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              Contact Email
            </label>

            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              placeholder="john@gmail.com"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg"
          >
            Create Job
          </button>

        </form>
      </div>
    </div>
  );
}