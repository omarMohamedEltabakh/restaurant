import { homeSection } from "./search.js";
const spin = document.querySelector(".spin");

addAndRemoveSpin()

export function addAndRemoveSpin(){
  spin.classList.remove("d-none");
  setTimeout(() => {
    spin.classList.add("d-none");
    }, 300);
  
}



  export class Home {
    constructor(){
        
    }


    async getMealsForHome(meal) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
        );
        const finalRes = await res.json();
        return finalRes.meals;
      }




    async SetMealsForHome() {
      let homeInner = document.querySelector(".homeInner");
      
      const mealsForHome = await this.getMealsForHome("");
  
      let allMeals = ``;
      for (let i = 0; i < mealsForHome.length; i++) {
        allMeals += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 mealHome ">
                <div class="item">
                    <div  class="position-relative layerAndImg overflow-hidden ">
                        <img  id='${mealsForHome[i].idMeal}' class="w-100 rounded-3" src="${mealsForHome[i].strMealThumb}" alt="" >
                        <div id='${mealsForHome[i].idMeal}' class="layer rounded-3 d-flex align-items-center ">
                            <h3 id='${mealsForHome[i].idMeal}' class='ps-2 text-center'>${mealsForHome[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;
      }
  
      homeInner.innerHTML = allMeals;
  
      const allMealHome = document.querySelectorAll(".mealHome");
      for (let i = 0; i < allMealHome.length; i++) {
        allMealHome[i].addEventListener("click", async(e) => {
          const mealId = e.target.getAttribute("id");
          const mealDetails = await this.getMealDetails(mealId);
          const allRecipes =  this.concatRecipes(mealDetails);
          const tags = this.tags(mealDetails);
          this.setMealDetails(mealDetails,allRecipes,tags);
        });
      }
    }



  
    async getMealDetails(id){
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const finalRes = await res.json();
      return finalRes.meals;
    }

  
   setMealDetails(details,allRecipes,tags) {
      let cartoona = ``;
      for (let i = 0; i < details.length; i++) {
        cartoona += `
    <div class="col-md-4">
        <img class="w-100" src="${details[i].strMealThumb}" alt="">
        <h2>${details[i].strCategory}</h2>
    </div>
  
    <div class="col-md-8">
        <h3>Instructions</h3>
        <p class="text-white">${details[i].strInstructions}</p>
            <h2>Area:<span>${details[i].strArea}</span></h2>
            <h2>Category :<span>${details[i].strCategory}</span></h2>
            <h2>Recipes :<span></span></h2>
           <div class="w-100 d-flex gap-3 pragraphs flex-wrap">
           
            ${allRecipes.map(function(recipe){
               return `<p class=" m-0">${recipe}</p>`
            }).join("")}
           </div>

           <h2 class="text-white mb-3 mt-3">Tags :</h2>
          <div class="d-flex tag">
            ${tags.map(function(tag){
              return `<p class="rounded-3 me-2">${tag}</p>`
            }).join("")}
            
          </div>

            <a target='_blank' href = '${details[i].strSource}'  class="btn btn-warning btnSource">Source</a>
            <a target='_blank' href = '${details[i].strYoutube}' class="btn btn-danger">Youtube</a>
    </div>
        `;
      }

      homeSection.classList.replace("d-block","d-none");
      
      document.querySelector(".mealDetails").classList.replace("d-none","d-block");
      document.querySelector(".detailsInner").innerHTML = cartoona;
    }


    concatRecipes(details){
        let arrey =[]
        arrey.push(details[0].strMeasure1,details[0].strMeasure2,details[0].strMeasure3,details[0].strMeasure4,details[0].strMeasure5
            ,details[0].strMeasure6,details[0].strMeasure7,details[0].strMeasure8,details[0].strMeasure9,details[0].strMeasure10,details[0].strMeasure11
            ,details[0].strMeasure12,details[0].strMeasure13,details[0].strMeasure14,details[0].strMeasure15,details[0].strMeasure16,details[0].strMeasure17
            ,details[0].strMeasure18,details[0].strMeasure19,details[0].strMeasure14,details[0].strMeasure20 );
            let filteredArray = arrey.filter(function(item) {
                return item !== null && item !== '' && item !=="1" && item !=="2" && item !=="3" && item !=="4" && item !== ' ';
            })
            return filteredArray;
    }

    tags(details){
        const allTag = details[0].strTags;
        console.log(allTag);
        if(allTag!=null){
          let wordArray = allTag.split(",")
          return wordArray;
        }
        else{
          const array =[];
          return array;
        }
    }
  }

  
  