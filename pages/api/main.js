export default 
function handler(req,res){
    (async () => {
        const rawResponse = 
        await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=93d4311093c44fd7ab139bfb993dcc09&ingredients=${req.body.ingredientList}&number=1&ranking=2&ignorePantry=true`,{
            method: 'GET'
        })
        .catch(e => {
            console.error(e)
        })
        const data = await rawResponse.json()
        res.status(200).json(data)
    })();
}