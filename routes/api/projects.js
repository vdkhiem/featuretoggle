// This is a typical CRUD apis
const { Router } = require("express");
const router = new Router();
const { check, validationResult } = require("express-validator");

// import models
const Project = require("../../models/Project");

// @route   GET api/projects
// @desc    Get all projects
// @access  Private
router.get("/", async (req, res) => {
  try {
    let projects = await Project.find();
    return res.json(projects);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/projects
// @desc    Add/Update a project
// @access  Private
router.post(
  "/",
  [
    check("code", "Code is required").exists(),
    check("name", "Name is require").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { code, name } = req.body;

      // Update existing project
      const foundProject = await Project.findOne({ code: code });
      if (foundProject) {
        console.log("foundProject", foundProject);
        foundProject.name = name;
        await foundProject.save();
        return res.json(foundProject);
      }

      // Add new project
      // Build profile object
      const projectFields = {};
      if (code) projectFields.code = code;
      if (name) projectFields.name = name;

      const project = new Project(projectFields);
      await project.save();
      return res.json(project);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/projects
// @desc    Delete a project
// @access  Private
router.delete(
  "/code/:code",
  [check("code", "Code is required").exists()],
  async (req, res) => {
    try {
      const foundProject = await Project.findOne({ code: req.params.code });
      if (!foundProject) {
        return res.status(404).json({ msg: "Not found project" });
      }

      await Project.deleteOne({ code: req.params.code });
      return res.json({ msg: "Project is deleted" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
