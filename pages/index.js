import Head from 'next/head'
import { useState, useEffect } from 'react'
import Product from './components/product'

export default function Home() {
  const [ingredients, setIngredients] = useState([])

  const [currIng, setCurrIng] = useState("")
  const updateIng = (e) => {
    setCurrIng(e.target.value)
  }

  const [list, setList] = useState([])

  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    setList(ingredients.map((ig) => {
      return <li>{ig}</li>
    }))
    setCurrIng("")
  }, [ingredients])

  const addToList = () => {
    if(currIng.length > 0){ 
      setIngredients([...ingredients, currIng] )
    }
    else{
      alert("The ingredients field is empty!")
    }
  }

  const clearList = () => {
    setIngredients([])
  }

  const fetchRecipes = () => {
      var ingredientString = ""
      ingredientString += ingredients.pop()
      ingredients.forEach(ing => {
        ingredientString += ",+"
        ingredientString += ing
      })
      fetch('./api/main', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredientList: ingredientString})
      })
      .then(response => {
        return response.json()
      })
      .then(data => {      
        setRecipeList(data.map((recipe) => {
          const recipeItems = []
          recipe.usedIngredients.forEach(ing => recipeItems.push(ing.originalString))
          recipe.missedIngredients.forEach(ing => {      
            recipeItems.push(ing.originalString) 
          })
          return (
            <Product key={recipe.id} name={recipe.title} imageURL = {recipe.image} usedIng={recipe.usedIngredientCount} missingIng={recipe.missedIngredientCount} ingredients={recipeItems}/>
          )
        }))
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="container">
      <Head>
        <title>Recipe Maker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="#">Recipe Maker!</a>
        </h1>

        <p className="description">
          Get started by entering the ingredients you have!
        </p>

        <form onSubmit={(e)=>e.preventDefault()}>
          <input type="text" placeholder="Enter Ingredient Name" onChange={updateIng} value={currIng}/>
          <button onClick={addToList}>Add</button>
          <button onClick={fetchRecipes}>Submit</button>
          <button onClick={clearList}>Clear</button>
        </form>
        <h3 className="desctitle description">Your ingredient list</h3>
        <ul id="list" className="list">
          {list}
        </ul>
        <div>
          {recipeList}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          color: #000;
        }

        .desctitle{
          margin-bottom: 0;
        }

        .list{
          margin-bottom: 1rem;
        }


        main {
          
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
