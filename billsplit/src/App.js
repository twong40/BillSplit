import React, { useState } from "react";
import "./App.css";
function App() {
  const [numPeople, setNumPeople] = useState(0);
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [result, setResult] = useState(0);
  const [err, setErr] = useState([
    {
      err: false,
      errMessage: ""
    },
    {
      err: false,
      errMessage: ""
    },
    {
      err: false,
      errMessage: ""
    }
  ]);
  function updatePeople(e) {
    if (/^\d+$/.test(e.target.value) === false) {
      console.log("Not a number");
      updateError(true, "Digits Only", 0);
    } else {
      setNumPeople(e.target.value);
      updateError(false, "", 0);
    }
    e.preventDefault();
  }
  function updateBill(e) {
    e.preventDefault();
    setBill(e.target.value);
  }
  function updateTip(e) {
    e.preventDefault();
    setTip(e.target.value);
  }
  function updateError(error, errorMessage, index) {
    const newErr = [...err];
    newErr[index] = { err: error, errMessage: errorMessage };
    setErr(newErr);
  }
  return (
    <div className="App">
      <header className="App-header">
        <p> Bill Splitter </p>
        <form>
          <label>
            Number of People:
            <input
              type="text"
              name="Number of People"
              defaultValue={numPeople}
              onChange={e => updatePeople(e)}
            />
          </label>
          <label>
            Total Bill:$
            <input
              type="text"
              name="Total Bill"
              defaultValue={bill}
              onChange={e => updateBill(e)}
            />
          </label>
          <label>
            Tip
            <input
              type="text"
              name="% Tip"
              defaultValue={tip}
              onChange={e => updateTip(e)}
            />
            %
          </label>
        </form>
        <p> Amount per person $ {result}</p>
      </header>
    </div>
  );
}

export default App;
