import { Home, addAndRemoveSpin } from "./home.js";



const areaSection = document.querySelector(".area");
const areaLink = document.getElementById("area");
const allSection = document.querySelectorAll('.home , .category , .search , .category , .mealDetails');
const allArea = document.querySelectorAll(".areaName");
const Section_mealsForArea = document.querySelector(".mealsForArea");
const areaInner = document.querySelector(".areaInner");

areaLink.addEventListener("click",function(){
    for (let i = 0; i <allSection.length; i++) {
        allSection[i].classList.replace("d-block","d-none");
    }
    areaSection.classList.replace("d-none","d-block")
})

for (let i = 0; i < allArea.length; i++) {
    allArea[i].addEventListener("click",async (e)=>{
        addAndRemoveSpin()
        const areaName = e.target.getAttribute("id");
        const area1 = new Area()
        const areaData = await area1.getArea(areaName);
        area1.setDataForArea(areaData);
        
    })
    
}


export class Area {
    constructor(){

    }

    async getArea(country){
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
        const finalRes = await res.json();
        return finalRes.meals;
    }
    setDataForArea(meals){
        console.log(meals);
        let allMeals = ``;
      for (let i = 0; i < meals.length; i++) {
        allMeals += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 mealArea  ">
                <div class="item">
                    <div  class="position-relative layerAndImg overflow-hidden ">
                        <img  id='${meals[i].idMeal}' class="w-100 rounded-3" src="${meals[i].strMealThumb}" alt="" >
                        <div id='${meals[i].idMeal}' class="layer rounded-3 d-flex align-items-center ">
                            <h3 id='${meals[i].idMeal}' class='ps-2 text-center'>${meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;
      }
      console.log(Section_mealsForArea);
      Section_mealsForArea.innerHTML = allMeals;
      areaInner.classList.replace("d-inline","d-none");
      const mealsArea = document.querySelectorAll(".mealArea");
      for (let i = 0; i < meals.length; i++){
        mealsArea[i].addEventListener("click",async(e)=>{
            const areaId = e.target.getAttribute("id");
            const home = new Home();
            const mealDetails = await home.getMealDetails(areaId);
            const allRecipes =  home.concatRecipes(mealDetails);
            const tags =home.tags(mealDetails);
            home.setMealDetails(mealDetails,allRecipes,tags);
            Section_mealsForArea.classList.replace('border-0',"d-none");
            

            


        })
        
      }



    }

}