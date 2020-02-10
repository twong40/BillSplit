import React, { useState, useEffect } from "react";

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
  useEffect(() => {
    updateResult();
  });
  function updatePeople(e) {
    if (/^\d+$/.test(e.target.value) === false) {
      updateError(true, "Invalid format in People", 0);
    } else {
      setNumPeople(e.target.value);
      updateError(false, "", 0);
    }
    e.preventDefault();
    return;
  }
  function updateBill(e) {
    if (/^[0-9]+(\.[0-9]{1,2})?$/gm.test(e.target.value) === false) {
      updateError(true, "Invalid format in Bills", 1);
    } else {
      setBill(e.target.value);
      updateError(false, "", 1);
    }
    e.preventDefault();
    return;
  }
  function updateTip(e) {
    if (/^[0-9]+(\.[0-9]*)?$/gm.test(e.target.value) === false) {
      updateError(true, "Invalid format in Tips", 2);
    } else {
      setTip(e.target.value);
      updateError(false, "", 2);
    }
    e.preventDefault();
    return;
  }
  function updateError(error, errorMessage, index) {
    const newErr = [...err];
    newErr[index] = { err: error, errMessage: errorMessage };
    setErr(newErr);
    return;
  }
  function updateResult() {
    if (!isNaN(Number(numPeople) && !isNaN(Number(bill) && !isNaN(tip)))) {
      let tipAmount = (Number(tip) / 100.0) * Number(bill);
      setResult((tipAmount + Number(bill)) / Number(numPeople));
    }
    return;
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1> Bill Splitter </h1>
        <form>
          <label className="labels">
            Number of People :
            <input
              type="text"
              name="Number of People"
              defaultValue={numPeople}
              onChange={e => updatePeople(e)}
              className="input-box"
            />
          </label>
          <label className="labels">
            Total Bill : $
            <input
              type="text"
              name="Total Bill"
              defaultValue={bill}
              onChange={e => updateBill(e)}
              className="input-box"
            />
          </label>
          <label className="labels">
            Tip :
            <input
              type="text"
              name="% Tip"
              defaultValue={tip}
              onChange={e => updateTip(e)}
              className="input-box"
            />
            %
          </label>
        </form>
        <p>
          {" "}
          Amount per person : $ <span className="amount-box">{result}</span>
        </p>
        <p>
          {err
            .filter(error => error.err === true)
            .map(error => (
              <div className="error-prompt">{error.errMessage}</div>
            ))}
        </p>
      </header>
    </div>
  );
}

export default App;
