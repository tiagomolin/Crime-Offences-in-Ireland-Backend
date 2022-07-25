const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  category_description: {
    type: String,
    required: true,
  },
  group_category: {
    type: String,
  },
});

const DivisionSchema = new mongoose.Schema({
  division_number: {
    type: Number,
    required: true,
  },
  division_description: {
    type: String,
    required: true,
  },
});

const PeriodSchema = new mongoose.Schema({
  period_number: {
    type: Number,
    required: true,
  },
  complete_quarter: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  quarter: {
    type: String,
    required: true,
  },
});

const CrimeSchema = new mongoose.Schema({
  division_number: {
    type: Number,
    required: true,
  },
  offence_count: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
const Division = mongoose.model("Division", DivisionSchema);
const Period = mongoose.model("Period", PeriodSchema);
const Crime = mongoose.model("Crime", CrimeSchema);

module.exports = { Category, Division, Period, Crime };
