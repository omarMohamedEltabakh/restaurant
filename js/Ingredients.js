import { hideAllSection } from "./hideSbling.js";
import { Home, addAndRemoveSpin } from "./home.js";
import { Search, searchSection } from "./search.js";



const ingredinetLink = document.getElementById("Ingredinets");
const ingredientSection = document.querySelector(".ingredient");
const allIngredinet = document.querySelectorAll(".ingredinetName");
const ingredinetMealsInner = document.querySelector(".ingredinetMeals");
const homeIngredinet = document.querySelector(".igredientInner");

ingredinetLink.addEventListener("click",function(){
    ingredientSection.classList.replace("d-none","d-block");
    hideAllSection(".ingredient");

   
})

for (let i = 0; i < allIngredinet.length; i++){
    allIngredinet[i].addEventListener("click",async(e)=>{
        addAndRemoveSpin()
        const ingredientName = e.target.getAttribute("id");
        const ingredient1 = new Ingredinet();
        const allMeals = await ingredient1.getIngredinet(ingredientName);
        ingredient1.setIngredinet(allMeals);
        const search1  = new Search();
        search1.hideAllSection(".ingredient");


    })
}

export class Ingredinet{
    constructor(){

    }
    async getIngredinet(meal){
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`);
        const finalRes = await res.json();
        return finalRes.meals;
    }

    setIngredinet(allMeal){

        let mealCa = ``;
        for (let i = 0; i < allMeal.length; i++) {
          mealCa += `
              <div class="col-lg-3 col-md-4 col-sm-6 col-12  mealIngredient">
                  <div class="item ">
                      <div  class="position-relative layerAndImg overflow-hidden id='${allMeal[i].idMeal}' ">
                          <img  id='${allMeal[i].idMeal}' class="w-100 rounded-3" src="${allMeal[i].strMealThumb}" alt="" >
                          <div id='${allMeal[i].idMeal}' class="layer rounded-3 d-flex align-items-center ">
                              <h3 id='${allMeal[i].idMeal}' class='ps-2 text-center'>${allMeal[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>
              </div>
          `;
        }
        homeIngredinet.classList.replace("d-block","d-none")
        ingredinetMealsInner.innerHTML = mealCa;

        const mealIngredientDivs = document.querySelectorAll(".mealIngredient");
        for (let i = 0; i < mealIngredientDivs.length; i++) {
            mealIngredientDivs[i].addEventListener("click",async(e)=>{
                const mealIngredientId = e.target.getAttribute("id");
                const home = new Home();
                ingredinetMealsInner.classList.replace("border-0","d-none");
                const mealDetails = await home.getMealDetails(mealIngredientId);
                const allRecipes =  home.concatRecipes(mealDetails);
                const tags =home.tags(mealDetails);
                home.setMealDetails(mealDetails,allRecipes,tags);
                

            })
            
        }
    }

    

}