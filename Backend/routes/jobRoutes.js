const router = require("express").Router();

const jobController = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");



router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJob);

router.post("/", auth, jobController.createJob);

router.patch("/:id", auth, jobController.updateJob);

router.delete("/:id", auth, jobController.deleteJob);

module.exports = router;