"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

// Step 1: List all authors
const uniqueAuthorList = (recipes) => {
	const authors = [];
	recipes.forEach((element) => {
		if (!authors.includes(element.Author)) {
			authors.push(element.Author);
		}
	});
	return authors;
};
// console.log(uniqueAuthorList(cakeRecipes));

// Step 2: Show all recipes (i also made an extra option in the menu as the concept text told to put this function under an option as well, but that option wasn't stated in the given menu)
const logRecipeNames = (recipes) => {
	if (recipes.length === 0) {
		console.log("No recipes found.");
		return;
	}

	recipes.forEach(({Name}) => {
		console.log(Name);
	});
};
// logRecipeNames(cakeRecipes);

// Step 3: Get all recipes from one author
const getRecipesByAuthor = (recipes, author) => {
	return recipes.filter((recipe) => recipe.Author.toLowerCase() === author.toLowerCase());
};
// const authorRecipes = getRecipesByAuthor(cakeRecipes, "Jane Hornby");
// console.log(authorRecipes);

// Step 4: Get recipes by ingredients
const getRecipesByIngredient = (recipes, ingredient) => {
	return recipes
		.filter((recipe) =>
			recipe.Ingredients.some((ing) =>
				ing.toLowerCase().includes(ingredient.toLowerCase().trim()),
			),
		)
		.map((recipe) => recipe.Name);
};
// const foundRecipes = getRecipesByIngredient(cakeRecipes, "140g caster sugar");
// console.log(foundRecipes);

// Step 5: Get a single recipe by name
const getRecipeByName = (recipes, nameRecipe) => {
	return recipes.find((recipe) =>
		recipe.Name.toLowerCase().includes(nameRecipe.toLowerCase().trim()),
	);
};
// const foundRecipe = getRecipeByName(cakeRecipes, "sticky bananas");
// console.log(foundRecipe);

// Step 6: Get ingredients list for a recipe
const getAllIngredients = (recipes) => {
	return recipes.reduce((allIngredients, recipe) => {
		return allIngredients.concat(recipe.Ingredients);
	}, []);
};

// Part 2
const displayMenu = () => {
	console.log("\nRecipe Management System Menu:");
	console.log("1. Show All Authors");
	console.log("2. Show Recipe names by Author");
	console.log("3. Show Recipe names by Ingredient");
	console.log("4. Get Recipe by Name");
	console.log("5. Get All Ingredients of Saved Recipes");
	console.log("6. Show All Recipes");
	console.log("0. Exit");
	const choice = prompt("Enter a number (1-6) or 0 to exit: ");
	return parseInt(choice);
};

let choice;
let savedRecipe = null;

do {
	choice = displayMenu();

	switch (choice) {
		case 1:
			console.log(uniqueAuthorList(cakeRecipes));
			break;
		case 2:
			const searchAuthor = prompt("Enter author name: ");
			console.log(getRecipesByAuthor(cakeRecipes, searchAuthor));
			break;
		case 3:
			const searchIngredient = prompt("Enter ingredient name: ");
			const foundRecipes = getRecipesByIngredient(cakeRecipes, searchIngredient);
			if (foundRecipes.length > 0) {
				console.log(foundRecipes);
			} else {
				console.log("No recipes found with that ingredient.");
			}
			break;
		case 4:
			const searchRecipe = prompt("Enter recipe name: ");
			const foundRecipe = getRecipeByName(cakeRecipes, searchRecipe);
			if (foundRecipe) {
				console.log("Recipe found:", foundRecipe);
				const saveRecipe = prompt(
					"Would you like to save this recipe for later use? (yes/no): ",
				)
					.toLowerCase()
					.trim();
				if (saveRecipe === "yes") {
					savedRecipe = foundRecipe;
					console.log("Recipe has been saved.");
				} else {
					console.log("Recipe is NOT saved.");
				}
			} else {
				console.log("Recipe not found.");
			}
			break;
		case 5:
			if (savedRecipe) {
				const groceryList = getAllIngredients([savedRecipe]);
				console.log("Grocery list for saved recipe:", groceryList);
			} else {
				console.log("No recipe saved. Please search for a recipe first (option 4).");
			}
			break;
		case 6:
			logRecipeNames(cakeRecipes);
			break;
	}
} while (choice !== 0);
