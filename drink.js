const translate = async (textToTranslate, targetLanguage) => {
    const deeplURL = 'https://api-free.deepl.com/v2/translate';
    const apiKey = 'ad0c7610-9057-7877-9630-b79586b23962:fx';

    try {
        const response = await fetch(deeplURL, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${apiKey}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                text: textToTranslate,
                target_lang: targetLanguage,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.translations[0].text;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};


document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const variableValue = urlParams.get('drink');

        const apiURL = "http://thecocktaildb.com/api/json/v1/1/search.php?s=" + variableValue
        const data = await fetch(apiURL)

        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
        const jsonData = await data.json();

        const name = document.querySelector("#name")
        const ingredients = document.querySelector("#Ingrédients")
        const instructions = document.querySelector("#Instructions")
        const liquid = document.querySelector('.liquid')
        const drinkObj = jsonData.drinks[0]

        liquid.classList.add(`${variableValue}`)

        for (let key in drinkObj) {
            if (key.includes('strIngredient') && drinkObj[key] !== null) {
                    ingredients.innerHTML += `<li> ${drinkObj[key]} </li>`
            }

            if (key.includes('strDrink'))
                name.innerHTML = `${drinkObj.strDrink}`

            if (key === 'strInstructions') {

                if (variableValue === 'gin_tonic') {
                    const tabInstr = drinkObj[key].split(", ")
                    for (let instruction of tabInstr) 
                            instructions.innerHTML += `<li> ${instruction} </li>`
                        
                }

                else {
                    const tabInstr = drinkObj[key].split(". ")
                    for (let instruction of tabInstr) 
                            instructions.innerHTML += `<li> ${instruction} </li>`
                }
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
});
