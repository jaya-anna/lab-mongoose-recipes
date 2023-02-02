const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const Gulasch = {
      title: "Gulasch",
      level: "Amateur Chef",
      cuisine: "hungarian",
      duration: 120,
      dishType: "main_course",
    };

    const createRecipe = async () => {
      try {
        const createdRecipe = await Recipe.create(Gulasch);
        console.log("Nice you added a new recipe", createdRecipe);
      } catch (err) {
        console.log(err);
      }
    };
    createRecipe();

    const insertRecipes = async () => {
      try {
        const insertedRecipe = await Recipe.insertMany(data);
        console.log("Recipes Array inserted to DB", insertedRecipe);
      } catch (err) {
        console.log(err);
      }
    };
    insertRecipes();

    const updateRecipe = async () => {
      try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          "63dbfd4f01cbd5317d555516",
          { duration: 100 },
          { new: true }
        );
        console.log("Recipe updated", updatedRecipe);
      } catch (err) {
        console.log(err);
      }
    };
    updateRecipe();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
