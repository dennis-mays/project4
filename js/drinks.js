const searchBtn = document.getElementById("search-btn");
const searchForm = document.querySelector("form");
const drinkList = document.getElementById("drink");
const drinkDetailsContent = document.querySelector(".drink-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getdrinkList);
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    getdrinkList;
});
drinkList.addEventListener("click", getdrinkRecipe);
recipeCloseBtn.addEventListener("click", () => {
    drinkDetailsContent.parentElement.classList.remove("showRecipe");
});

// get drink list that matches with the ingredients
function getdrinkList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
    )
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            if (data.drinks) {
                data.drinks.forEach((drink) => {
                    html += `
                    <div class = "drink-item" data-id = "${drink.idDrink}">
                        <div class = "drink-img">
                            <img src = "${drink.strDrinkThumb}" alt = "food">
                        </div>
                        <div class = "drink-name">
                            <h3>${drink.strDrink}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                drinkList.classList.remove("notFound");
                document
                    .querySelector("#searchResultTitle")
                    .classList.remove("hideRecipe");
            } else {
                html = "Sorry, we didn't find any drink!";
                drinkList.classList.add("notFound");
            }

            drinkList.innerHTML = html;
        });
}

// get recipe of the drink
function getdrinkRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let drinkItem = e.target.parentElement.parentElement;
        fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => drinkRecipeModal(data.drinks));
    }
}

// create a modal
function drinkRecipeModal(drink) {
    console.log(drink);
    drink = drink[0];
    let ingredients = "";
    for (let i = 1; drink[`strIngredient${i}`]; i++) {
        ingredients +=
            `${drink[`strMeasure${i}`]} ${drink[`strIngredient${i}`]}` + "<br>";
    }
    let html = `
        <h2 class = "recipe-title">${drink.strDrink}</h2>
        <p class = "recipe-category">${drink.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Ingredients:</h3>
            <p>${ingredients}</p>
            <h3>Instructions:</h3>
            <p>${drink.strInstructions}</p>
        </div>
        <div class = "recipe-drink-img">
            <img src = "${drink.strDrinkThumb}" alt = "">
        </div>
    `;
    drinkDetailsContent.innerHTML = html;
    drinkDetailsContent.parentElement.classList.add("showRecipe");
}
