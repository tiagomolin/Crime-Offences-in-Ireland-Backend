const express = require("express");
const { Category, Division, Period, Crime } = require("./models");
const app = express();

//Categories
app.get("/categories", async (request, response) => {
  const categories = await Category.find({});

  try {
    response.send(categories);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Divisions
app.get("/divisions", async (request, response) => {
  const divisions = await Division.find({});

  try {
    response.send(divisions);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Periods
app.get("/periods", async (request, response) => {
  const periods = await Period.find({});

  try {
    response.send(periods);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Crimes - gets the first 10 rows of the crime table grouping by division and filtering period and category
//using post to send the period and category as body
app.post("/crimes", async (request, response) => {
  //gets the body of the request
  const { initial_period_number, final_period_number, categories } =
    request.body.data;

  if (!request.body) {
    return response.status(400).send("Please provide a body");

    //returns the 400 status code and the error message
  }
  if (!initial_period_number || !final_period_number || !categories) {
    return response
      .status(400)
      .send(
        "Request body is empty. Please inform the initial and final period number and the categories"
      );
  }

  //tests if the request body variables are empty
  if (
    initial_period_number === "" ||
    final_period_number === "" ||
    categories === ""
  ) {
    response
      .status(400)
      .send(
        "Request body is empty. Please inform the initial and final period number and the categories"
      );
  }

  var categories_list = [];
  //checks if the categories array is empty
  if (categories.length > 0) {
    categories_list = categories.map((category) => category.category);
  }

  const crimes = await Crime.aggregate([
    //filter initial and final period
    {
      $match: {
        $and: [
          { period_number: { $gte: parseInt(initial_period_number) } },
          { period_number: { $lte: parseInt(final_period_number) } },
          { category: { $in: categories_list } },
        ],
      },
    },
    {
      $group: {
        _id: "$division_number",
        division_number: { $last: "$division_number" },
        offence_count: { $sum: "$offence_count" },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  //const crimes = await Crime.find({}).limit(10);

  try {
    response.send(crimes);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
