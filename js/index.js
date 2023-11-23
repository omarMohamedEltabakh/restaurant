import { Home, addAndRemoveSpin } from "./home.js";
import { Category } from "./category.js";
import { Search } from "./search.js";
import { Area } from "./area.js";
import { Ingredinet } from "./Ingredients.js";
import { uName } from "./Contact_Us.js";
import { hideAllSection } from "./hideSbling.js";




//start sideBar
const sideBarWidth = $("#sideBar").innerWidth();
const logoWidth = $(".divLogo").innerWidth();
const closeBar = document.querySelector(".closeBar");
const menuBar = document.querySelector(".menuBar");
const finalWidth = sideBarWidth - logoWidth;

$("#sideBar").css("left", -finalWidth);
closeBar.classList.replace("d-flex", "d-none");
menuBar.classList.replace("d-none", "d-flex");

$(".closeBar").click(function () {
  closeBar.classList.replace("d-flex", "d-none");
  menuBar.classList.replace("d-none", "d-flex");
  $("ul").slideUp(200);
  $("#sideBar").animate({ left: -finalWidth }, 500);
});

$(".menuBar").click(function () {
  menuBar.classList.replace("d-flex", "d-none");
  closeBar.classList.replace("d-none", "d-flex");
  $("#sideBar").animate({ left: "0px" }, 400);
  $("ul").slideDown(1000);
});

const allUl = document.querySelectorAll("ul li");

for (let i = 0; i < allUl.length; i++){
  allUl[i].addEventListener("click",function(){
    $("#sideBar").animate({ left: -finalWidth }, 500);
    closeBar.classList.replace("d-flex", "d-none");
    menuBar.classList.replace("d-none", "d-flex");
    addAndRemoveSpin();
  })

  
}

//end sideBar


const home = new Home();
home.SetMealsForHome();



































