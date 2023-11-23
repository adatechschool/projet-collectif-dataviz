document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const variableValue = urlParams.get('drink');

    const apiURL = "http://thecocktaildb.com/api/json/v1/1/search.php?s=" + variableValue //à réutiliser en changeant le nom du cocktail
    fetch(apiURL).then(rep => rep.json()).then(data => {

        const name = document.querySelector("#name")
        const ingredients = document.querySelector("#Ingrédients")
        const instructions = document.querySelector("#Instructions")

        const drinkObj = data.drinks[0]

        for (let key in drinkObj) {
            if (key.includes('strIngredient') && drinkObj[key] !== null)
                ingredients.innerHTML += `<li> ${drinkObj[key]} </li>`

            if (key.includes('strDrink'))
                name.innerHTML = `${drinkObj.strDrink}`

            if (key === 'strInstructions'){
                
                if ( variableValue === 'gin_tonic'){
                    const tabInstr = drinkObj[key].split(", ")
                    for (let instruction of tabInstr)
                        instructions.innerHTML += `<li> ${instruction} </li>`
                }

                else{
                    const tabInstr = drinkObj[key].split(". ")
                    for (let instruction of tabInstr)
                        instructions.innerHTML += `<li> ${instruction} </li>`
                }
            }
        }
    });
});
