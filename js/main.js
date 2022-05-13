const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("item");
const itemDetailContent = document.querySelector(".item-detail-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

const mealSearchURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const mealRecipeURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// event listeners
searchBtn.addEventListener("click", getMealList);
// mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    itemDetailContent.parentElement.classList.remove("showRecipe");
});

function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    fetch(mealSearchURL + searchInputTxt)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                <div class="item-meal">
                    <img src="${meal.strMealThumb}" alt="food" />
                    <div class="flex-container">
                        <h1 class="title">${meal.strMeal}</h1>
                        <a href="#" class="view-button">View Recipe</a>
                    </div>
                </div>
                `;
                });
                mealList.classList.remove("notFound");
            } else {
                html = "Sorry, no meals found for search criteria";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
        });
}
