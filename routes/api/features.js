const { Router } = require("express");
const router = new Router();
const { check, validationResult } = require("express-validator");

// import models
const Feature = require("../../models/Feature");

// @route   GET api/features
// @desc    Get all features
// @access  Private
router.get("/", async (req, res) => {
  try {
    const features = await Feature.find();
    return res.json(features);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/features
// @desc    Add/Update a feature
// @access  Private
router.post(
  "/",
  [
    check("code", "Code is required").exists(),
    check("name", "Name is required").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const foundFeature = await Feature.findOne({ code: req.body.code });
      if (foundFeature) {
        Object.assign(foundFeature, req.body);
        await foundFeature.save();
        return res.json(foundFeature);
      }

      const feature = new Feature(req.body);
      await feature.save();
      return res.json(feature);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route   POST api/enablefeature/:code
// @desc    Enable/disable a feature
// @access  Private
router.post("/enablefeature/:code", async (req, res) => {
  try {
    const foundFeature = await Feature.findOne({ code: req.params.code });
    const { enabled } = req.body;
    foundFeature.enabled = enabled;
    await foundFeature.save();
    return res.json(foundFeature);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

// @route   GET api/enablefeature/:code
// @desc    Enable/disable a feature
// @access  Private
router.get("/enablefeature/:code", async (req, res) => {
  try {
    const foundFeature = await Feature.findOne({ code: req.params.code });
    if (!foundFeature) {
      return res.status(404).json({ msg: "Feature not found" });
    }

    return res.json(foundFeature.enabled);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
