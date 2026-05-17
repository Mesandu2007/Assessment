import { useEffect, useState } from "react";
import { getJobs, updateJob, deleteJob } from "../api/service";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    loadJobs();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateJob(id, status);
      loadJobs();
    } catch (err) {
      // Log response data if available for easier debugging
      console.error("Failed to update job status:", err.response?.data || err.message);
      alert(`Failed to update status: ${err.response?.data?.message || "Internal Server Error"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(id);
      loadJobs();
    } catch (err) {
      console.error("Failed to delete job:", err.response?.data || err.message);
      alert(`Failed to delete job: ${err.response?.data?.message || "Not Found"}`);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || job.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Job Dashboard</h1>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-3xl shadow-md mb-8 flex flex-wrap gap-4 items-end border border-slate-200">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-600 mb-1">Search by name or title</label>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <select
              className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
            <select
              className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Painting</option>
              <option>Joinery</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-slate-500 animate-pulse">Loading jobs...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-shadow">

            <h2 className="font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <p className="text-sm text-gray-500">
              Status: {job.status}
            </p>
            <p className="text-sm" text-gray-500>
              Category:{job.category}
            </p>
            <p className="text-sm text-gray-500">
              Contact: {job.contactName} ({job.contactEmail})
            </p>

            {user && (
              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => handleUpdate(job._id, "pending")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Pending
                </button>

                <button
                  onClick={() => handleUpdate(job._id, "in-progress")}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                  In Progress
                </button>

                <button
                  onClick={() => handleUpdate(job._id, "completed")}
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                >
                  Completed
                </button>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>

              </div>
            )}

            </div>
          ))}
        </div>

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}