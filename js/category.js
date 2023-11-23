import { hideAllSection } from "./hideSbling.js";
import { Home, addAndRemoveSpin } from "./home.js";


const categoryLink = document.getElementById("category");
export const categorySection = document.querySelector(".category");
const categoryInner =document.querySelector(".categoryInner");


categoryLink.addEventListener("click", async ()=>{    
    categorySection.classList.replace("d-none","d-block");
    hideAllSection(".category");
    const category1 = new Category()
    const allCategory = await category1.getCategorys();
    category1.setCategorys(allCategory);
})







export class Category{
    constructor(){
    }

    async getCategorys(){
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const finalRes = await res.json();
        return finalRes.categories;
    }
    
    setCategorys(allCategory){
        let category=``;
        for (let i = 0; i < allCategory.length; i++){

            category += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 mealCategory ">
                <div class="item">
                    <div  class="position-relative layerAndImg overflow-hidden ">
                        <img  id='${allCategory[i].strCategory}' class="w-100 rounded-3" src="${allCategory[i].strCategoryThumb}" alt="" >
                        <div id='${allCategory[i].strCategory}' class="layer rounded-3 d-flex align-items-center flex-column ">
                            <h3 id='${allCategory[i].strCategory}' class='ps-2 text-center'>${allCategory[i].strCategory}</h3>
                            <p id='${allCategory[i].strCategory}' class='text-center'>${allCategory[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        }
        categoryInner.innerHTML = category;
        const mealCategory = document.querySelectorAll(".mealCategory");
        for (let i = 0; i < mealCategory.length; i++){
            mealCategory[i].addEventListener("click",async(e)=>{
                categorySection.classList.replace("d-none","d-block");
                addAndRemoveSpin()
                const mealName = e.target.getAttribute('id');
                const data  = await this.getMealCategory(mealName);
                this.setMealForCategory(data);
               
        
            })
            
        }


    }

    async getMealCategory(mealName){
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
        const finalRes = await res.json();
        return finalRes.meals;

    }

    async setMealForCategory(allMeal){

        let mealCa = ``;
        for (let i = 0; i < allMeal.length; i++) {
          mealCa += `
              <div class="col-lg-3 col-md-4 col-sm-6 col-12  mealCategory">
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
        categoryInner.innerHTML = mealCa;

        const allM = document.querySelectorAll(".mealCategory");
        for (let i = 0; i < allM.length; i++) {
            allM[i].addEventListener("click",async (e)=>{
                categorySection.classList.replace("d-block","d-none");
                const mealCategoryId = e.target.getAttribute("id");
                const home = new Home();
                const mealDetails = await home.getMealDetails(mealCategoryId);
                const allRecipes =  home.concatRecipes(mealDetails);
                const tags =home.tags(mealDetails);
                home.setMealDetails(mealDetails,allRecipes,tags);
                

            })
            
        }

       
    }


    
    
}