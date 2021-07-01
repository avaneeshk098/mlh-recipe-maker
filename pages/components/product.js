import Image from 'next/image'

export default function Product({name, imageURL, ingredients, usedIng, missingIng}){
  var list = []
  if(ingredients !== undefined){
    list = 
    ingredients.map((element) => {
      return <p key={element} className="item">{element}</p>
    })
  }

  return (
    <div>
        <div className="card">
            <h1 className="main">{name}</h1>
            <h2 className="ingtitle">Ingredients</h2>
            <div className="ingList">
                {list}
            </div>
            <p>Used Ingredients: <span className="numberItem">{usedIng}</span></p>
            <p>Missing Ingredients: <span className="numberItem">{missingIng}</span>
            </p>
        </div>

        <style jsx>{`
        .main{
            width: 100%;
        }

        .ingtitle{
          margin-bottom: 0;
        }
        .numberItem{
          color: #0070f3;
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
          margin-top: 0;
          display: flex;
          flex-direction: column;
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

        .card p{
          width: 100%;
          font-size: 1.25em !important;
          font-weight: 700;
          line-height: 1px; 
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
    )
}