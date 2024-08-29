import React, { useState } from 'react'
import axios from "axios"


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialX = 2
const initialY = 2
const initialIndex = 4//x * 3 + y // the index the "B" is at

/*Not used. Just a visual represantion of the board
const board = [ [[1, 1], [1, 2], [1, 3]],   //rows x 1 2 3 UP OR DOWN
                [[2, 1], [2, 2], [2, 3]],   //cols y 1 2 3 RIGHT OR LEFT
                [[3, 1], [3, 2], [3, 3]]
              ]
*/


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  //Need to useState for steps, x and y due to test not passing
  const [currIndex, setCurrIndex] = useState(initialIndex)
  const [x, setX] = useState(initialX); 
  const [y, setY] = useState(initialY); 
  const [steps, setSteps] = useState(initialSteps); 

  /*function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }*/

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${x}, ${y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setX(initialX);
    setY(initialY);
    setSteps(initialSteps);
    setCurrIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let newX = x;
    let newY = y;

    switch (direction) {
      case 'up':
        if (y > 1) newY--;
        break;
      case 'down':
        if (y < 3) newY++;
        break;
      case 'right':
        if (x < 3) newX++;
        break;
      case 'left':
        if (x > 1) newX--;
        break;
      default:
        console.log("Can't move there");
        return currIndex;
    }

    //I was not getting the current state when clicking
    //Added this to render the current state
    if (newX !== x || newY !== y) {
      setX(newX);
      setY(newY);
      setSteps(prevCounter => prevCounter + 1);
      return getIndex(newX, newY);
    }
    console.log("x: " + x + " y: "+ y)
    console.log(getIndex(x, y))
    //return getIndex(x, y)//x * 3 + y
    return currIndex;
  }

  function getIndex(x, y){
    //Formula converts a 2d array index to a 1d array index
    return (y - 1) * 3 + (x - 1);
  }

  const move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setCurrIndex(getNextIndex(evt.target.id));
  }

  //for email
  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currIndex ? ' active' : ''}`}>
              {idx === currIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left"> LEFT </button>
        <button onClick={move} id="up"> UP </button>
        <button onClick={move} id="right"> RIGHT </button>
        <button onClick={move} id="down"> DOWN </button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
