import { useState, useEffect } from "react"
import { addNewJoke, getAllJokes } from "./services/jokeService.jsx"
import stevePic from "./assets/steve.png"
import "./App.css"


export const App = () => {
  const [newJokeState, setNewJokeState] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  useEffect(() => {
    getAllJokes().then(jokes => {
      setAllJokes(jokes)
    })
  }, [])

  useEffect(() => {
    if (allJokes.length > 0) {
      const untold = allJokes.filter(joke => !joke.told)
      const told = allJokes.filter(joke => joke.told)
      setUntoldJokes(untold)
      setToldJokes(told)
    }
  }, [allJokes])

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJokeState}
          onChange={(event) => {
            setNewJokeState(event.target.value);
          }}
        />
        <button
          className="joke-input-submit"
          onClick={() => {
            addNewJoke({ text: newJokeState, told: false }).then(() => {
              setNewJokeState("")
              getAllJokes().then(jokes => {
                setAllJokes(jokes)
              })
            })
          }}
        >
          Add
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map(joke => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>
            Told <span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map(joke => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

//   return <>
//   <div className="app-heading-circle">
//    <img className="app-logo" src={stevePic} alt="Good job Steve" />
//   </div>
//   <h1>Chuckle Checklist</h1>
//   <div>
//     <p>Add Joke:</p>
//   <input
//     className=""
//     type="text"
//     placeholder="New One Liner"
//     value={newJokeState}
//     onChange={(event) => {
//       setNewJokeState(event.target.value)
//     // What's the value of event?
//     }}
//     />
//     <button onClick={() => {addNewJoke(
//       {
//         text:newJokeState,
//         told:false
//       }
//       ).then(setNewJokeState(""))
//       }}>Add</button>
//   </div>
//   <section className="joke-list-container">

//     <div>
//       <p>Untold:</p>
//       <ul>
//         {untoldJokes.map(joke => (
//           <li key={joke.id}>{joke.text}</li>
//         ))}
//       </ul>
//     </div>
//     <div>
//       <p>Told:</p>
//       <ul>
//         {toldJokes.map(joke => (
//           <li key={joke.id}>{joke.text}</li>
//         ))}
//       </ul>
//     </div>
//   </section>


//   </>
// }

