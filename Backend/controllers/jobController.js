const JobRequest = require("../models/JobRequest");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobRequest.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getJob = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Not found" });

    res.json(job);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};


exports.createJob = async (req, res) => {
  try {
    const job = await JobRequest.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};


exports.updateJob = async (req, res) => {
  try {
    const job = await JobRequest.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after", runValidators: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const job = await JobRequest.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) return res.status(404).json({ message: "Job not found or unauthorized" });

    res.json({ message: "Deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};