import { form } from "./Contact_Us.js";
import { categorySection } from "./category.js";
import { hideAllSection } from "./hideSbling.js";
import { Home, addAndRemoveSpin } from "./home.js";



const mealDetails  = document.querySelector(".mealDetails")


// start search

 const searchLink = document.getElementById("search");
export const homeSection = document.querySelector(".home");
export const searchSection = document.querySelector(".search");
 const searchInput = document.getElementById("searchInput");
 const sLitterInput = document.getElementById("sLitterInput");

sLitterInput.addEventListener("input", async (e) => {
  addAndRemoveSpin()
  const inputValue = e.target.value;
  const search1 = new Search();
  const meal = await search1.getMealforSearchByLitter(inputValue);
  search1.displayMeal(meal);
});
searchInput.addEventListener("input", async (e) => {
  const inputValue = e.target.value;
  const search1 = new Search();
  const meal = await search1.getMealforSearchByName(inputValue);
  setTimeout(() => {
    addAndRemoveSpin()
    search1.displayMeal(meal);
  }, 2000);
});

searchLink.addEventListener("click", function () {
  searchSection.classList.replace("d-none", "d-block");
  hideAllSection(".search");
});
// end search

export class Search{
    constructor(){

    }
    async getMealforSearchByLitter(letter){
        const res =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const finalRes = await res.json();
        return finalRes.meals;
        
    }


    async getMealforSearchByName(foodName){
        const res =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
        const finalRes = await res.json();
        return finalRes.meals;
        
    }



    displayMeal(meal){
        let allMeals =``;
        for (let i = 0; i < meal.length; i++) {
          allMeals += `
              <div class="col-lg-3 col-md-4 col-sm-6 col-12 mealSearch ">
                  <div class="item">
                      <div class="position-relative layerAndImg overflow-hidden ">
                          <img id='${meal[i].idMeal}' class="w-100 rounded-3" src="${meal[i].strMealThumb}" alt="">
                          <div id='${meal[i].idMeal}' class="layer rounded-3 d-flex align-items-center">
                              <h3 id='${meal[i].idMeal}' class='ps-2 text-center'>${meal[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>
              </div>
          `
      
        }

        document.querySelector(".innerSearch").innerHTML = allMeals;

        const mealSearch = document.querySelectorAll(".mealSearch");

        for (let i = 0; i < mealSearch.length; i++) {
          mealSearch[i].addEventListener("click", async (e) => {
            searchSection.classList.replace("d-block", "d-none");
            const mealId = e.target.getAttribute("id")
            console.log(mealId);
            const home = new Home();
            const mealDetails = await home.getMealDetails(mealId);
            const allRecipes =  home.concatRecipes(mealDetails);
            const tags =home.tags(mealDetails);
            home.setMealDetails(mealDetails,allRecipes,tags);
          });
        }

    }


    
}