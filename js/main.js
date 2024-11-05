/// <reference types="../@types/jquery" />

function openNav(){
    $(".side-nav-menu").css("left","0px")
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $(".link-list li").css("top","0px")
}

function closeNav(){
    $(".side-nav-menu").css("left","-256px")
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".link-list li").css("top","200px")
}
$(".open-close-icon").on("click",function(){
    if ($(".open-close-icon").hasClass("fa-align-justify")) {
        openNav()      
    }
    else(closeNav())
})

async function searchMeal(){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await response.json()
    let meals = data.meals
    let cartona = ``
for (let i = 0; i < meals.length; i++) {
    cartona+=` <div class="col-md-3">
                        <div  class="meal position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
                        </div>
                </div>
    `  
}
$("#rowData").html(cartona)
$(".loading-screen").addClass("d-none")
$(".col-md-3").on("click",(e)=>{
    let ele = $(e.currentTarget).find("h3").text()
    console.log(ele)
    $("#description").removeClass("d-none")
    $("#main").addClass("d-none")
    showDescription(ele)
})

}
searchMeal()



 async function showDescription(element){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch (`https://themealdb.com/api/json/v1/1/search.php?s=${element}`)
    let data = await response.json()
    let meal = data.meals[0]
    let ingredient =``
    for (let i= 1 ; i < 18 ; i++ ){
        if(meal[`strIngredient${i}`])
        ingredient +=`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]}  ${meal[`strIngredient${i}`]}</li>`
    }
    console.log(ingredient)
    
    let detailsBox = `<div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 position-relative">
                <h2>Instructions</h2>
                <i class="fa-solid close-icon fa-x fa-2x position-absolute end-0 top-0 text-white"></i>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredient}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    $("#detailsContent").html(detailsBox)
 
    $(".loading-screen").addClass("d-none")
    $(".close-icon").on("click",()=>{
        closeDescreption()
    })
    
}

$(".close-icon").on("click",()=>{
    closeDescreption()
})

function closeDescreption(){
        $("#main").removeClass("d-none")
        $("#description").addClass("d-none")
        location.reload()
        
}

async function mealsCategory(){
    $(".loading-screen").removeClass("d-none")
    let response= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let data = await response.json()
    let category = data.categories
    console.log(category)
    let categoryBox=``
    for(let i = 0;i<category.length;i++){
        let description =  category[i].strCategoryDescription.split(" ").slice(0,20).join(" ")
        categoryBox+=`<div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${category[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex flex-column align-items-center text-center text-black p-2">
                        <h3 class=".cursor-pointer">${category[i].strCategory}</h3>
                        <p class=".cursor-pointer">${description}</p>
                    </div>
                </div>
        </div>`
        $("#meals-category").html(categoryBox)
        $("#meals-category").removeClass("d-none")
        $("#main").addClass("d-none")
        $(".loading-screen").addClass("d-none")
        $("#search").addClass("d-none")
        $(".meal").on("click",(e)=>{
            let x = e.target.closest(".meal")
            let cat = $(x).find("h3").text()
            searchCategory(cat)
        })
    }
}
$(".category").on("click",()=>{
    mealsCategory()
    $("#description").addClass("d-none")
    $("#contact").addClass("d-none")
    
    closeNav()
})

async function searchCategory(c){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
    let data = await response.json()
    let meals = data.meals
    let categoryMeals=``
    for(let i=0 ; i < meals.length ; i++){
        categoryMeals +=`<div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
        $("#meals-category").html(categoryMeals)
        $(".loading-screen").addClass("d-none")
        $(".col-md-3").on("click",(e)=>{
            let caat = $(e.currentTarget).find("h3").text()
            console.log(caat)
            
            $("#description").removeClass("d-none")
            $("#main").addClass("d-none")
            $("#meals-category").addClass("d-none")
            showDescription(caat)
        })
    }
}



$(".search").on("click",()=>{
    $("#description").addClass("d-none")
    $("#main").addClass("d-none")
    $("#meals-category").addClass("d-none")
    $("#search").removeClass("d-none")
    $("#description").addClass("d-none")
    $("#contact").addClass("d-none")
    
    closeNav()
})



async function searchByName(x){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    let data = await response.json()
    let meals= data.meals
    $(".loading-screen").addClass("d-none")
    console.log(meals)
    if(meals==null){
        window.alert("Not Found ...! ")
    }
    let cartona = ``
for (let i = 0; i < meals.length; i++) {
    cartona+=` <div class="col-md-3">
                        <div  class="meal position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-center text-black p-2">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
                        </div>
                </div>
    `  
}

$("#rowData").html(cartona)
$("#main").removeClass("d-none")
$(".col-md-3").on("click",(e)=>{
    let ele = $(e.currentTarget).find("h3").text()
    console.log(ele)
    $("#description").removeClass("d-none")
    $("#main").addClass("d-none")
    showDescription(ele)
})   
}

$("input#by").on("keyup",()=>{
    let value = ($("input#by").val())
    searchByName(value)
})

$("input#fLetter").on("keyup",()=>{
    let value = $("input#fLetter").val()
    console.log(value)
    searchByFirst(value)
    
})

async function searchByFirst(s){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${s}`)
    let data = await response.json()
    let meals= data.meals
    $(".loading-screen").addClass("d-none")
    console.log(data)
    if(meals==null){
        window.alert("Not Found ...! ")  
    }
    let cartona = ``
for (let i = 0; i < meals.length; i++) {
    cartona+=` <div class="col-md-3">
                        <div  class="meal position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
                        </div>
                </div>
    `  
}

$("#rowData").html(cartona)
$("#main").removeClass("d-none")
$(".col-md-3").on("click",(e)=>{
    let ele = $(e.currentTarget).find("h3").text()
    console.log(ele)
    $("#description").removeClass("d-none")
    $("#main").addClass("d-none")
    showDescription(ele)
})   
}


$(".area").on("click",()=>{
    mealArea()
    closeNav()
    $("#main").removeClass("d-none")
    $("#meals-category").addClass("d-none")
    $("#search").addClass("d-none")
    $("#description").addClass("d-none")
    $("#contact").addClass("d-none")
   
})

async function mealArea(){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json()
    let areas=data.meals
    console.log(areas)
    let cartona = ``
for (let i = 0; i < areas.length; i++) {
    cartona+= `<div class="col-md-3">
                <div  class="currArea rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h3 class="text-white" >${areas[i].strArea}</h3>
                </div>
        </div> `  
}
$("#rowData").html(cartona)
$(".loading-screen").addClass("d-none")
$(".currArea").on("click",(e)=>{
    let ele = e.target.closest(".currArea")
    let h3text= $(ele).find("h3").text()
    console.log(h3text) 
    getMealsArea(h3text)
})
}


async function getMealsArea(e){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e}`)
    let data = await response.json()
    let meals = data.meals
    let cartona = ``
for (let i = 0; i < meals.length; i++) {
    cartona+=` <div class="col-md-3">
                        <div  class="meal position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
                        </div>
                </div>
    `  
}
$("#rowData").html(cartona)
$(".loading-screen").addClass("d-none")
$(".col-md-3").on("click",(e)=>{
    let ele = $(e.currentTarget).find("h3").text()
    console.log(ele)
    $("#description").removeClass("d-none")
    $("#main").addClass("d-none")
    showDescription(ele)
})
}


$(".ingridents").on("click",()=>{
    closeNav()
    mealsIng()
    $("#main").removeClass("d-none")
    $("#meals-category").addClass("d-none")
    $("#search").addClass("d-none")
    $("#description").addClass("d-none")
    $("#contact").addClass("d-none")
    
})

async function mealsIng(){
    $(".loading-screen").removeClass("d-none")
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await responce.json()
    let ings = data.meals
    console.log(ings)
    let cartona = ``
for (let i = 0; i < 20; i++){
    let description =  ings[i].strDescription.split(" ").slice(0,20).join(" ")
    cartona+=`
    <div class="col-md-3">
                <div  class="ings rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class=".cursor-pointer">${ings[i].strIngredient}</h3>
                        <p class=".cursor-pointer">${description}</p>
                </div>
        </div>`
}
$("#rowData").html(cartona)
$(".loading-screen").addClass("d-none")
$(".ings").on("click",(e)=>{
    let ele = e.target.closest(".ings")
    let h3text= $(ele).find("h3").text()
    console.log(h3text) 
    getMealsIngs(h3text)
})

}

async function getMealsIngs(e){
    $(".loading-screen").removeClass("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e}`)
    let data = await response.json()
    let meals = data.meals
    let cartona = ``
for (let i = 0; i < meals.length; i++) {
    cartona+=` <div class="col-md-3">
                        <div  class="meal position-relative overflow-hidden rounded-2">
                            <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
                        </div>
                </div>
    `  
}
$("#rowData").html(cartona)
$(".loading-screen").addClass("d-none")
$(".col-md-3").on("click",(e)=>{
    let ele = $(e.currentTarget).find("h3").text()
    console.log(ele)
    $("#description").removeClass("d-none")
    $("#main").addClass("d-none")
    showDescription(ele)
})
}

$(".contactUs").on("click",()=>{
    $("#contact").removeClass("d-none")
    $("#main").addClass("d-none")
    $("#meals-category").addClass("d-none")
    $("#search").addClass("d-none")
    $("#description").addClass("d-none")
    closeNav()
    $("#nameAlert").addClass("d-none")
    $("#emailAlert").addClass("d-none")
    $("#phoneAlert").addClass("d-none")
    $("#nameInput").val("")
    $("#emailInput").val("")
    $("#phoneInput").val("")
})

function nameValidation(){
    let regex = /^[A-Z a-z]{2,12}$/
    let test = $("#nameInput").val()
    if(regex.test(test)){
        $("#nameAlert").addClass("d-none")
        if($("#repasswordInput").val() != "" && $("#passwordInput").val() != "" && $("#ageInput").val() != null && $("#phoneInput").val() !="" && $("#nameInput").val() !="" && $("#emailInput").val() !=""){
            document.getElementById("submitBtn").removeAttribute("disabled")
        }
        
    }
    else{
        $("#nameAlert").removeClass("d-none")
        document.getElementById("submitBtn").setAttribute("disabled", true)
    }

}


function mailValidation(){
    let regex = /^\w{3,20}@(gmail|yahoo|outlook)\.com$/
    let test = $("#emailInput").val()
    if(regex.test(test)){
        $("#emailAlert").addClass("d-none")
        if($("#repasswordInput").val() != "" && $("#passwordInput").val() != "" && $("#ageInput").val() != null && $("#phoneInput").val() !="" && $("#nameInput").val() !="" && $("#emailInput").val() !=""){
            document.getElementById("submitBtn").removeAttribute("disabled")
        }  
    }
    else{
        $("#emailAlert").removeClass("d-none")
        document.getElementById("submitBtn").setAttribute("disabled", true)
        
    }

}

function phoneValidation(){
    let regex = /^\d{8,11}$/
    let test = $("#phoneInput").val()
    if(regex.test(test)){
        $("#phoneAlert").addClass("d-none")
        if($("#repasswordInput").val() != "" && $("#passwordInput").val() != "" && $("#ageInput").val() != null && $("#phoneInput").val() !="" && $("#nameInput").val() !="" && $("#emailInput").val() !=""){
            document.getElementById("submitBtn").removeAttribute("disabled")
        }
    }
    else{
        $("#phoneAlert").removeClass("d-none")   
        document.getElementById("submitBtn").setAttribute("disabled", true) 
    }
  
}


function ageValidation(){
    let regex = /^[0-9]{1,2}$/
    let test = $("#ageInput").val()
    if(regex.test(test)){
        $("#ageAlert").addClass("d-none")  
        if($("#repasswordInput").val() != "" && $("#passwordInput").val() != "" && $("#ageInput").val() != null && $("#phoneInput").val() !="" && $("#nameInput").val() !="" && $("#emailInput").val() !=""){
            document.getElementById("submitBtn").removeAttribute("disabled")
        }
    }
    else{
        $("#ageAlert").removeClass("d-none") 
        document.getElementById("submitBtn").setAttribute("disabled", true) 
    }
    return regex.test(test)
}

$("#ageInput").on("click",()=>{
    ageValidation()
})


function passwordValidation(){
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let test = $("#passwordInput").val()
    if(regex.test(test)){
        $("#passwordAlert").addClass("d-none")
        if($("#repasswordInput").val() != "" && $("#passwordInput").val() != "" && $("#ageInput").val() != null && $("#phoneInput").val() !="" && $("#nameInput").val() !="" && $("#emailInput").val() !=""){
            document.getElementById("submitBtn").removeAttribute("disabled")
        }
    }
    else{
        $("#passwordAlert").removeClass("d-none")
        document.getElementById("submitBtn").setAttribute("disabled", true)
        
    }

}

function repasswordValidation(){
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let test = $("#repasswordInput").val()
    if(regex.test(test) && $("#repasswordInput").val()== $("#passwordInput").val()){
        $("#repasswordAlert").addClass("d-none")
        if($("#repasswordInput").val() != "" && $("#passwordInput").val() != "" && $("#ageInput").val() != null && $("#phoneInput").val() !="" && $("#nameInput").val() !="" && $("#emailInput").val() !=""){
            document.getElementById("submitBtn").removeAttribute("disabled")
        }
        
    }
    else{
        $("#repasswordAlert").removeClass("d-none")
        document.getElementById("submitBtn").setAttribute("disabled", true)
        
    }

    
}


