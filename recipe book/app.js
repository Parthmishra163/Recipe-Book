document.addEventListener('DOMContentLoaded', function () {
    // Load existing recipes from local storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Function to display recipes in the recipe-list section
    function displayRecipes() {
        const recipesList = document.getElementById('recipes');
        recipesList.innerHTML = '';

        recipes.forEach((recipe, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = recipe.name;
            listItem.addEventListener('click', () => displayRecipeDetails(index));
            recipesList.appendChild(listItem);
        });
    }

    // Function to display details of a selected recipe
    function displayRecipeDetails(index) {
        const selectedRecipe = document.getElementById('selected-recipe');
        const recipe = recipes[index];

        selectedRecipe.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Preparation Steps:</strong><br>${recipe.preparationSteps}</p>
            <img src="${recipe.image}" alt="${recipe.name}" width="200">
        `;
    }

    // Function to handle form submission and add new recipes
    const addRecipeForm = document.getElementById('add-recipe-form');
    addRecipeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const recipeName = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('ingredients').value;
        const preparationSteps = document.getElementById('preparation-steps').value;
        const recipeImage = document.getElementById('recipe-image').value;

        // Validate input data
        if (!recipeName || !ingredients || !preparationSteps) {
            alert('Please fill in all fields.');
            return;
        }

        // Add the new recipe to the recipes array
        const newRecipe = {
            name: recipeName,
            ingredients: ingredients,
            preparationSteps: preparationSteps,
            image: recipeImage || 'placeholder.jpg', // Default image if none provided
        };

        recipes.push(newRecipe);

        // Save recipes to local storage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Display updated recipe list
        displayRecipes();
    });

    // Function to handle search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.toLowerCase().includes(searchTerm) ||
            recipe.preparationSteps.toLowerCase().includes(searchTerm)
        );

        displayRecipes(filteredRecipes);
    });

    // Initial display of recipes
    displayRecipes();
});
