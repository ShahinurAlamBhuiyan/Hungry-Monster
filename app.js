
var inputMeal = document.getElementById('inputMealName');
var inputMealValue = inputMeal.value;

// using meal API...
function mealPath() {
    inputMealValue = inputMeal.value;
    if (inputMealValue == '') {
        return alert('please, enter your food name!');
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMealValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const mealName = data.meals;
                getMealInfo(mealName)
            })
            .catch(err => {
                alert('Please, check your spell!')
                document.getElementById('inputMealName').value = ''
            })
    }
}
// To get meal information...
const getMealInfo = mealHere => {
    const mainContent = document.getElementById('mainContent');
    mealHere.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'each-meal-div'
        mealDiv.id = 'hideDiv'
        const mealInfo = `
        <img onclick="mealDetailsAPI('${meal.strMeal}')" src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h3>
        `;
        mealDiv.innerHTML = mealInfo;
        mainContent.appendChild(mealDiv);
    })
}
// Click search button ...
document.getElementById('searchMeal').addEventListener('click', function searchButtonClick() {
    mealPath();
    document.getElementById('inputMealName').value ='';
    document.getElementById('mainContent').innerHTML = '';
})
// // Click Home Button ....
// document.getElementById("homeClicked").addEventListener('click',function () {
//     document.getElementById("mealDetails").style.display = 'none';
//     document.getElementById("formId").style.display = 'block'
//     console.log('home clicked')
// })

const showMealDetails = mealHere=>{
    document.getElementById("formId").style.display = 'none'
    document.getElementById("mainContent").style.display = 'none'
    document.getElementById("mealDetails").style.display = "block"
    const mealDetails = document.getElementById("mealDetails");
    mealHere.forEach(details => {
    const mealDetailDiv = document.createElement('div')
    const mealDetailInfo = `
        <img src="${details.strMealThumb}">
        <h2 class="text"> ${details.strMeal}</h2>
        <li class="text">${details.strMeasure1}  ${details.strIngredient1}</li>
        <li class="text">${details.strMeasure2}  ${details.strIngredient2}</li>
        <li class="text">${details.strMeasure3}  ${details.strIngredient3}</li>
        <li class="text">${details.strMeasure4}  ${details.strIngredient4}</li>
        <li class="text">${details.strMeasure5}  ${details.strIngredient5}</li>
        <li class="text">${details.strMeasure6}  ${details.strIngredient6}</li>
        <footer class="footerHere"><a href="${details.strYoutube}" target="blank">Watch Video</a></footer>
    `
    mealDetailDiv.innerHTML = mealDetailInfo;
    mealDetails.appendChild(mealDetailDiv);
    });
}

const mealDetailsAPI = name=>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const meal = data.meals;
                showMealDetails(meal);
            })
}
